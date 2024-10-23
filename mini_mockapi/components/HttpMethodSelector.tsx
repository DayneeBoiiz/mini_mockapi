"use client";

import { httpMethods } from "@/lib/methods";
import { HttpMethods } from "@/next-types";

interface HttpMethodSelectorProps {
  enabledMethods: HttpMethods;
  handleToggle: (method: keyof HttpMethods) => void;
}

const HttpMethodSelector: React.FC<HttpMethodSelectorProps> = ({
  enabledMethods,
  handleToggle,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        HTTP Methods
      </label>
      <div className="mt-2 space-y-2">
        {httpMethods.map((method) => (
          <div key={method} className="flex items-center">
            <input
              type="checkbox"
              id={method}
              checked={enabledMethods[method as keyof HttpMethods]}
              onChange={() => handleToggle(method as keyof HttpMethods)}
              className="mr-2"
            />
            <label htmlFor={method} className="text-sm text-gray-600">
              {method}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HttpMethodSelector;
