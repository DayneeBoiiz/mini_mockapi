"use client";

import { dataTypes, fakerMethods } from "@/lib/methods";
import {  Field } from "../next-types";
import { FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

interface SchemaInputProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

const SchemaInput: React.FC<SchemaInputProps> = ({ fields, setFields }) => {
  const handleFieldChange = (index: number, key: string, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const [fieldDropdownOpenIndex, setFieldDropdownOpenIndex] = useState<
    number | null
  >(null);
  const [fakerDropdownOpenIndex, setFakerDropdownOpenIndex] = useState<
    number | null
  >(null);
  const [searchValues, setSearchValues] = useState<{ [key: number]: string }>(
    {}
  );
  const fakerDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fieldDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "Faker.js", fakerMethod: "" }]);
  };

  const handleSearchChange = (index: number, value: string) => {
    setSearchValues((prev) => ({ ...prev, [index]: value }));
  };

  const getFilteredMethods = (index: number) => {
    const searchValue = searchValues[index]?.toLowerCase() || "";
    return Object.keys(fakerMethods).flatMap((category) => {
      const methods = fakerMethods[category as keyof typeof fakerMethods];
      return methods.filter((method) =>
        method.toLowerCase().includes(searchValue)
      );
    });
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const toggleFieldDropdown = (index: number) => {
    setFieldDropdownOpenIndex(fieldDropdownOpenIndex === index ? null : index);
  };

  const toggleFakerDropdown = (index: number) => {
    setFakerDropdownOpenIndex(fakerDropdownOpenIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fakerDropdownOpenIndex !== null) {
        const currentDropdown =
          fakerDropdownRefs.current[fakerDropdownOpenIndex];
        if (
          currentDropdown &&
          !currentDropdown.contains(event.target as Node)
        ) {
          setFakerDropdownOpenIndex(null); // Close dropdown when clicking outside
        }
      }

      if (fieldDropdownOpenIndex !== null) {
        const currentFieldDropdown =
          fieldDropdownRefs.current[fieldDropdownOpenIndex];
        if (
          currentFieldDropdown &&
          !currentFieldDropdown.contains(event.target as Node)
        ) {
          setFieldDropdownOpenIndex(null); // Close field dropdown when clicking outside
        }
      }
    };

    // Add event listener to detect clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fakerDropdownOpenIndex, fieldDropdownOpenIndex]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-inner w-full">
      <div className="w-full">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex space-x-4 mb-4 items-center group w-full"
          >
            <div className="grid grid-cols-6 grid-rows-1 gap-4 items-center space-x-2 w-full">
              <input
                type="text"
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
                className="col-span-2 p-2 border rounded-md focus:border-purple-500 focus:ring-purple-500 truncate text-ellipsis whitespace-nowrap overflow-hidden"
                placeholder="Field name"
              />

              <div
                className="relative col-span-2 col-start-3"
                ref={(el) => {
                  fieldDropdownRefs.current[index] = el;
                }}
              >
                <button
                  onClick={() => toggleFieldDropdown(index)}
                  className="flex items-center justify-between w-full p-2 border rounded-md bg-white focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                >
                  <span className="truncate text-ellipsis whitespace-nowrap overflow-hidden">
                    {field.type === "Object ID" ? "Object ID" : field.type}
                  </span>
                </button>

                {fieldDropdownOpenIndex === index && (
                  <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-full">
                    {dataTypes.map((type) => {
                      return (
                        <>
                          {type !== "Object ID" && (
                            <button
                              key={type}
                              onClick={() =>
                                handleFieldChange(index, "type", type)
                              }
                              className="block w-full p-2 text-left hover:bg-gray-100"
                            >
                              {type}
                            </button>
                          )}
                        </>
                      );
                    })}
                  </div>
                )}
              </div>

              {field.type === "Faker.js" && (
                <div
                  className="relative col-span-2 col-start-5"
                  ref={(el) => {
                    fakerDropdownRefs.current[index] = el;
                  }}
                >
                  <button
                    onClick={() => toggleFakerDropdown(index)}
                    className="flex items-center justify-between w-full p-2 border rounded-md bg-white focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                  >
                    <span className="truncate text-ellipsis whitespace-nowrap overflow-hidden">
                      {field.fakerMethod || "Select faker method"}
                    </span>
                  </button>

                  {fakerDropdownOpenIndex === index && (
                    <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg w-full">
                      {/* Search input for filtering faker methods */}
                      <input
                        type="text"
                        value={searchValues[index] || ""}
                        onChange={(e) =>
                          handleSearchChange(index, e.target.value)
                        }
                        placeholder="Search faker method..."
                        className="block w-full p-2 border-b border-gray-300 focus:outline-none"
                      />

                      {/* Filtered dropdown options */}
                      <div className="max-h-48 overflow-y-auto">
                        {getFilteredMethods(index).map((method) => (
                          <button
                            key={method}
                            onClick={() => {
                              handleFieldChange(index, "fakerMethod", method);
                              toggleFakerDropdown(index);
                            }}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => handleRemoveField(index)}
              className={`text-red-600 font-semibold invisible ${
                index > 0 && "group-hover:visible"
              } transition-opacity duration-200 flex items-center`}
              aria-label="Remove field"
            >
              <FaTrash className="h-5 w-5 mr-1" />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddField}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          <span className="mr-2">+</span> Add Field
        </button>
      </div>
    </div>
  );
};

export default SchemaInput;
