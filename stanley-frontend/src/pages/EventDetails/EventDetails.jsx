// src/pages/EventDetails/EventDetails.jsx
import { useParams, Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import { eventList } from "../../utils/EventDatabase";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const ev = (eventList || []).find((e) => String(e.id) === String(id));

  if (!ev) {
    return (
      <div className="filter-page">
        <Navigation />
        <div className="find-events-wrapper">
          <div className="intro-box">
            <p>Event not found.</p>
            <Link to="/" className="details-back">← Back to events</Link>
          </div>
        </div>
      </div>
    );
  }

  // build iso for display if needed
  let iso = null;
  if (ev.date && typeof ev.date === "object" && ev.date.year && ev.date.month && ev.date.day) {
    const months = {
      january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
      july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
    };
    const m = typeof ev.date.month === "number" ? ev.date.month : (months[String(ev.date.month).toLowerCase()] || 1);
    iso = `${ev.date.year}-${String(m).padStart(2, "0")}-${String(ev.date.day).padStart(2, "0")}`;
  }

  return (
    <div className="filter-page">
      <Navigation />

      {/* MAIN EVENT BOX */}
      <div className="intro-box">
        <div className="details-container">
          <div className="details-left">
            <h1 className="details-title">{ev.heading}</h1>

            <div style={{ margin: "10px 0 18px", display: "flex", alignItems: "center", gap: 12 }}>
              <div className={`status-badge status-${(ev.status ?? "unknown").toLowerCase()}`}>
                {(ev.status ?? "unknown").toUpperCase()}
              </div>
            </div>

            <p className="details-meta">
              {iso ? new Date(iso).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }) : "Date TBD"}
              {" • "}
              {ev.location}
            </p>

            <div className="details-desc">{ev.description}</div>

            <div style={{ marginTop: 18 }}>
              <Link to="/" className="details-back">← Back to events</Link>
            </div>
          </div>

          <div className="details-right">
            {ev.img ? <img src={ev.img} alt={ev.heading} className="details-image" /> : <div className="image-placeholder" />}
          </div>
        </div>
      </div>

      {/* GALLERY BOX - separate container BELOW the main event box */}
      {ev.gallery && ev.gallery.length > 0 && (
        <div className="gallery-box" aria-label="Event gallery">
          <h3 className="gallery-title">Event Gallery</h3>

          <div className="gallery-grid">
            {ev.gallery.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Event gallery ${index + 1}`}
                className="gallery-img"
                onError={(e) => (e.currentTarget.style.opacity = 0.6)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
