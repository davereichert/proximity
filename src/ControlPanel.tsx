import { useSupportStore } from "./store";
import { CheckCircleIcon, CloseCircleIcon, HeadsetIcon } from "./icons";

export function ControlPanel() {
  const status = useSupportStore((s) => s.status);
  const setStatus = useSupportStore((s) => s.setStatus);

  return (
    <div className="control-page">
      <header className="control-header">
        <div className="control-header__logo">
          <HeadsetIcon className="control-header__logo-icon" />
        </div>
        <div>
          <div className="control-header__title">Support Console</div>
          <div className="control-header__subtitle">Tap a button to update the display</div>
        </div>
      </header>

      <div className={`status-banner status-banner--${status}`}>
        {status === "open" ? (
          <CheckCircleIcon className="status-banner__icon" />
        ) : (
          <CloseCircleIcon className="status-banner__icon" />
        )}
        <span>
          Currently Displaying: {status === "open" ? "Open" : "Closed"}
        </span>
      </div>

      <div className="switch-grid">
        <button
          type="button"
          className={`switch-btn switch-btn--open ${
            status === "open" ? "switch-btn--active" : ""
          }`}
          onClick={() => setStatus("open")}
          aria-pressed={status === "open"}
        >
          <CheckCircleIcon className="switch-btn__icon" />
          <span className="switch-btn__label">OPEN</span>
        </button>

        <button
          type="button"
          className={`switch-btn switch-btn--closed ${
            status === "closed" ? "switch-btn--active" : ""
          }`}
          onClick={() => setStatus("closed")}
          aria-pressed={status === "closed"}
        >
          <CloseCircleIcon className="switch-btn__icon" />
          <span className="switch-btn__label">CLOSED</span>
        </button>
      </div>
    </div>
  );
}
