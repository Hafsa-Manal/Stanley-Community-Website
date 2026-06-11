// src/pages/FilterEvents/FilterEvents.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./FilterEvents.css";
import { eventList } from "../../utils/EventDatabase";

const normalizeEvent = (ev) => {
  const months = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  };

  const y = ev.date?.year ?? null;
  const m =
    typeof ev.date?.month === "number"
      ? ev.date.month
      : months[String(ev.date?.month ?? "").toLowerCase()] ?? null;
  const d = ev.date?.day ?? null;

  const isoDate = y && m && d ? `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` : null;

  return {
    id: ev.id,
    title: ev.heading,
    img: ev.img,
    description: ev.description,
    location: ev.location,
    status: (ev.status ?? "unknown").toLowerCase(),
    isoDate,
    year: y,
    month: m,
  };
};

const FilterEvents = () => {
  const [events, setEvents] = useState([]);

  // ⭐ ADDED — State for dummy "added" button
  const [addedEvents, setAddedEvents] = useState({}); 

  // filter/search state
  const [q, setQ] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filter, setFilter] = useState({ month: null, year: null, status: null });
  const [sortBy, setSortBy] = useState("date-desc");

  // load + normalize
  useEffect(() => {
    setEvents(Array.isArray(eventList) ? eventList.map(normalizeEvent) : []);
  }, []);

  const handleFilter = () => {
    setFilter({
      month: selectedMonth || null,
      year: selectedYear || null,
      status: selectedStatus || null,
    });
  };

  const clearFilters = () => {
    setQ("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedStatus("");
    setFilter({ month: null, year: null, status: null });
    setSortBy("date-desc");
  };

  const filteredEvents = useMemo(() => {
    let list = events.slice();

    // filters
    if (filter.status) list = list.filter((ev) => ev.status === filter.status);
    if (filter.month) list = list.filter((ev) => Number(filter.month) === ev.month);
    if (filter.year) list = list.filter((ev) => Number(filter.year) === ev.year);

    // search
    const qTrim = (q || "").trim().toLowerCase();
    if (qTrim) {
      list = list.filter(
        (ev) =>
          String(ev.title ?? "").toLowerCase().includes(qTrim) ||
          String(ev.location ?? "").toLowerCase().includes(qTrim)
      );
    }

    // sort
    if (sortBy === "date-asc") {
      list.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
    } else if (sortBy === "date-desc") {
      list.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
    } else if (sortBy === "status") {
      const rank = { upcoming: 0, ongoing: 1, cancelled: 2, past: 3, unknown: 4 };
      list.sort((a, b) => (rank[a.status] ?? 99) - (rank[b.status] ?? 99));
    }

    return list;
  }, [events, filter, q, sortBy]);

  return (
    <div className="filter-page">
      <Navigation />

      <div className="intro-box">
        <h1>📒Welcome to Stanley Events📝✨</h1>
        <p>Your gateway to every event, workshop, and opportunity at Stanley — discover what’s happening across campus and never miss an experience.</p>
      </div>

      <div className="find-events-wrapper">
        {/* FILTER BAR */}
        <div className="filter-box-wrapper">
          <div className="left-controls">
            <input
              className="search-input"
              placeholder="Search by title or location..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <label>
              Month
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">--</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">Jul</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
            </label>

            <label>
              Year
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">--</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </label>

            <label>
              Status
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="">--</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>

            <label>
              Sort
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date-desc">Date (new → old)</option>
                <option value="date-asc">Date (old → new)</option>
                <option value="status">Sort by status</option>
              </select>
            </label>

            <button className="filter-btn" onClick={handleFilter}>Apply</button>
            <button className="clear-btn" onClick={clearFilters}>Clear</button>
          </div>
        </div>

        {/* EVENT LIST */}
        <div className="event-list">
          {filteredEvents.length === 0 ? (
            <p className="no-events">No events match your filters</p>
          ) : (
            filteredEvents.map((ev) => (
              <article className="event-card" key={ev.id}>
  {/* inline style forces the grid immediately (test) */}
  <div
    className="event-grid"
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 300px",
      gap: "20px",
      alignItems: "center",
    }}
  >
    <div className="event-title-row">
      <Link to={`/events/${ev.id}`} className="event-title-link">
        <h2 className="event-title">{ev.title}</h2>
      </Link>
      <span className={`status-badge status-${ev.status}`}>
        {ev.status.toUpperCase()}
      </span>
    </div>

    <div className="event-meta">
      {ev.isoDate
        ? new Date(ev.isoDate).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })
        : "Date TBD"}
    </div>

    <div className="event-location">{ev.location}</div>

    <p className="event-desc">{ev.description}</p>

    <button
      className={`event-add-btn ${addedEvents[ev.id] ? "added" : ""}`}
      onClick={() =>
        setAddedEvents((prev) => ({ ...prev, [ev.id]: !prev[ev.id] }))
      }
    >
      {addedEvents[ev.id] ? "Added ✓" : "Add to My Events"}
    </button>

    <div className="event-image-wrapper">
      <Link to={`/events/${ev.id}`}>
        {ev.img ? (
          <img src={ev.img} alt={ev.title} className="event-image" />
        ) : (
          <div className="image-placeholder" />
        )}
      </Link>
    </div>
  </div>
</article>

            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterEvents;
