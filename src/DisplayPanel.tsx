import { useSupportStore } from "./store";
import { SupportClosedIcon, SupportOpenIcon } from "./icons";

const EMERGENCY_PHONE = "+41 52 235 74 64";

export function DisplayPanel() {
  const status = useSupportStore((s) => s.status);
  const isOpen = status === "open";

  return (
    <main className={`display-page display-page--${status}`} role="status">
      {isOpen ? (
        <div className="status-sign status-sign--open">
          <SupportOpenIcon className="status-sign__icon" />

          <h1 className="status-sign__title">
            IT support is available
            <br />
            at the moment
          </h1>
          <p className="status-sign__subtitle">Feel free to stop by.</p>

          <hr className="status-sign__divider" />

          <h2 className="status-sign__title status-sign__title--de">
            Zurzeit ist ein IT-Mitarbeiter erreichbar.
          </h2>
          <p className="status-sign__subtitle">
            Sie können gerne vorbeikommen. Wir helfen Ihnen gerne!
          </p>
        </div>
      ) : (
        <div className="status-sign status-sign--closed">
          <SupportClosedIcon className="status-sign__icon" />

          <h1 className="status-sign__title">
            No IT operator is available
            <br />
            at the moment
          </h1>
          <p className="status-sign__subtitle">Please come back another time.</p>

          <hr className="status-sign__divider" />

          <h2 className="status-sign__title status-sign__title--de">
            Zurzeit ist kein IT Mitarbeiter erreichbar.
          </h2>
          <p className="status-sign__subtitle">
            Bitte kommen Sie zu einem späteren Zeitpunkt wieder.
          </p>

          <hr className="status-sign__divider" />

          <p className="status-sign__call-label">For urgent matters, please call:</p>
          <p className="status-sign__call-label">Für dringende Angelegenheiten rufen Sie bitte an unter:</p>

          <p className="status-sign__phone">{EMERGENCY_PHONE}</p>
        </div>
      )}
    </main>
  );
}
