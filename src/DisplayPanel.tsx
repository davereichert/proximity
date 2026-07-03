import { useSupportStore } from "./store";
import { CheckCircleIcon, CloseCircleIcon } from "./icons";

export function DisplayPanel() {
  const status = useSupportStore((s) => s.status);
  const isOpen = status === "open";

  return (
    <main className={`display-page display-page--${status}`} role="status">
      <div className="sign">
        {isOpen ? (
          <CheckCircleIcon className="sign__icon" />
        ) : (
          <CloseCircleIcon className="sign__icon" />
        )}
        <p className="sign__message">
          {isOpen ? (
            <>IT Support is open</>
          ) : (
            <>
              IT Support is closed and will open again soon for emergencies
              please call 4572
            </>
          )}
        </p>
      </div>
    </main>
  );
}
