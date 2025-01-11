import { checkoutSteps } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

export const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between mb-10 flex-col space-x-2 space-y-2 md:flex-row">
      {checkoutSteps.map((step, index) => (
        <Fragment key={step.name}>
          <div
            className={cn(
              "w-56 rounded-full p-2 text-center text-sm",
              index === current ? "bg-secondary" : "",
            )}
          >
            {step.name}
          </div>
          {step.name !== "Place Order" && (
            <hr className="mx-2 w-16 border-t border-gray-300" />
          )}
        </Fragment>
      ))}
    </div>
  );
};
