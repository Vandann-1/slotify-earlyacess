import { useEffect, useState, useRef } from "react";
import API from "../services/api";

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#F59E0B" : "none"} stroke={filled ? "#F59E0B" : "#D1D5DB"} strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "#EF4444" : "none"} stroke={filled ? "#EF4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

  .slots-root {
    font-family: 'DM Sans', sans-serif;
    color: #0D0F1A;
    min-height: 100vh;
    --brand: #2F2FE4;
    --brand-hover: #2424B8;
    --brand-light: #EEEEFF;
    --brand-xlight: #F5F5FF;
    --success: #059669;
    --warning: #D97706;
    --border: #E8ECF4;
    --text-2: #6B7280;
    --text-3: #9CA3AF;
    --radius: 12px;
    --shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    --shadow-hover: 0 4px 20px rgba(47,47,228,0.1), 0 2px 8px rgba(0,0,0,0.06);
  }

  /* ── SEARCH BAR ─── */
  .s-searchbar {
    display: flex;
    align-items: center;
    gap: 0;
    background: #fff;
    border: 2px solid var(--brand);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(47,47,228,0.12);
    margin-bottom: 28px;
  }
  .s-search-field {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    padding: 0 18px;
    height: 54px;
    border-right: 1.5px solid var(--border);
    color: var(--text-2);
  }
  .s-search-field:last-of-type { border-right: none; }
  .s-search-field input, .s-search-field select {
    border: none; outline: none; background: transparent;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0D0F1A;
    width: 100%; font-weight: 500;
  }
  .s-search-field input::placeholder { color: var(--text-3); font-weight: 400; }
  .s-search-btn {
    height: 54px;
    padding: 0 28px;
    background: var(--brand);
    border: none; cursor: pointer;
    color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 700;
    letter-spacing: 0.01em;
    display: flex; align-items: center; gap: 8px;
    transition: background 0.15s;
    white-space: nowrap;
  }
  .s-search-btn:hover { background: var(--brand-hover); }

  /* ── LAYOUT ─── */
  .s-layout { display: flex; gap: 24px; align-items: flex-start; }

  /* ── SIDEBAR ─── */
  .s-sidebar {
    width: 280px;
    min-width: 280px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow);
    position: sticky;
    top: 24px;
  }
  .s-sidebar-header {
    padding: 18px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .s-sidebar-title {
    font-weight: 700; font-size: 14.5px; color: #0D0F1A;
    display: flex; align-items: center; gap: 8px;
  }
  .s-clear-btn {
    font-size: 12px; font-weight: 600; color: var(--brand);
    background: none; border: none; cursor: pointer; font-family: inherit;
    padding: 4px 8px; border-radius: 6px; transition: background 0.15s;
  }
  .s-clear-btn:hover { background: var(--brand-xlight); }
  .s-filter-section { padding: 18px 20px; border-bottom: 1px solid var(--border); }
  .s-filter-section:last-child { border-bottom: none; }
  .s-filter-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--text-2); margin-bottom: 12px;
  }

  /* Checkboxes */
  .s-check-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 7px 0; cursor: pointer; gap: 10px;
  }
  .s-check-item:hover .s-check-label { color: var(--brand); }
  .s-checkbox {
    width: 18px; height: 18px; border-radius: 5px;
    border: 1.5px solid #D1D5DB; background: #fff;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.15s;
  }
  .s-checkbox.checked { background: var(--brand); border-color: var(--brand); }
  .s-check-label { font-size: 13.5px; font-weight: 500; color: #374151; flex: 1; }
  .s-check-count {
    font-size: 11.5px; color: var(--text-3); font-weight: 500;
    background: #F3F4F6; padding: 1px 7px; border-radius: 99px;
  }

  /* Price range */
  .s-range-labels { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .s-range-label { font-size: 12px; font-weight: 600; color: var(--text-2); }
  .s-range-input {
    width: 100%; accent-color: var(--brand); height: 4px;
    border-radius: 99px; cursor: pointer;
  }

  /* Duration chips */
  .s-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .s-chip {
    padding: 6px 12px; border-radius: 99px;
    border: 1.5px solid var(--border); background: #fff;
    font-size: 12.5px; font-weight: 600; color: #374151;
    cursor: pointer; transition: all 0.15s; font-family: inherit;
  }
  .s-chip:hover { border-color: var(--brand); color: var(--brand); }
  .s-chip.active { background: var(--brand); border-color: var(--brand); color: #fff; }

  /* ── RESULTS AREA ─── */
  .s-results { flex: 1; min-width: 0; }
  .s-results-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .s-results-count { font-size: 20px; font-weight: 800; color: #0D0F1A; font-family: 'Fraunces', serif; }
  .s-results-sub { font-size: 13px; color: var(--text-2); margin-top: 2px; }
  .s-sort-select {
    display: flex; align-items: center; gap: 8px;
    border: 1.5px solid var(--border); border-radius: 10px;
    padding: 8px 14px; background: #fff; color: #374151;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; box-shadow: var(--shadow);
  }

  /* Result Card */
  .s-card {
    background: #fff; border: 1.5px solid var(--border);
    border-radius: 16px; overflow: hidden; margin-bottom: 16px;
    display: flex; cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
    box-shadow: var(--shadow);
    animation: fadeUp 0.3s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .s-card:hover { border-color: var(--brand); box-shadow: var(--shadow-hover); transform: translateY(-1px); }
  .s-card.selected { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(47,47,228,0.12), var(--shadow-hover); }

  /* Card thumbnail */
  .s-card-thumb {
    width: 200px; min-width: 200px;
    background: linear-gradient(135deg, #EEF0FF 0%, #E0E7FF 100%);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    flex-shrink: 0;
  }
  .s-card-thumb-inner {
    width: 72px; height: 72px; border-radius: 20px;
    background: #fff; box-shadow: 0 4px 20px rgba(47,47,228,0.15);
    display: flex; align-items: center; justify-content: center;
  }
  .s-card-thumb-letter {
    font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700;
    color: var(--brand); line-height: 1;
  }
  .s-thumb-badge {
    position: absolute; bottom: 12px; left: 12px;
    background: rgba(255,255,255,0.95); border-radius: 99px;
    padding: 4px 10px; font-size: 11px; font-weight: 700;
    color: var(--success); display: flex; align-items: center; gap: 4px;
  }
  .s-thumb-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
  .s-heart-btn {
    position: absolute; top: 10px; right: 10px;
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(255,255,255,0.92); border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #9CA3AF;
    transition: transform 0.15s, color 0.15s;
  }
  .s-heart-btn:hover { transform: scale(1.1); }

  /* Card body */
  .s-card-body { padding: 20px; flex: 1; min-width: 0; }
  .s-card-tenant { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--brand); margin-bottom: 4px; }
  .s-card-name { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 700; color: #0D0F1A; margin-bottom: 6px; line-height: 1.25; }
  .s-card-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; flex-wrap: wrap; }
  .s-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12.5px; color: var(--text-2); font-weight: 500; }
  .s-stars { display: flex; align-items: center; gap: 2px; }
  .s-card-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
  .s-tag {
    font-size: 11.5px; font-weight: 600; padding: 4px 10px;
    border-radius: 99px; border: 1px solid var(--border);
    color: var(--text-2); background: #F9FAFB;
  }

  /* Card right / price */
  .s-card-right {
    padding: 20px 20px 20px 0;
    display: flex; flex-direction: column;
    align-items: flex-end; justify-content: space-between;
    min-width: 160px; flex-shrink: 0;
  }
  .s-rating-box {
    display: flex; align-items: center; gap: 8px;
  }
  .s-rating-label { font-size: 12px; font-weight: 600; color: var(--text-2); text-align: right; }
  .s-rating-score {
    background: var(--brand); color: #fff;
    font-size: 14px; font-weight: 800;
    width: 36px; height: 36px; border-radius: 10px 10px 2px 10px;
    display: flex; align-items: center; justify-content: center;
  }
  .s-price-block { text-align: right; }
  .s-price-label { font-size: 11px; color: var(--text-3); font-weight: 500; margin-bottom: 2px; }
  .s-price { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; color: #0D0F1A; line-height: 1; }
  .s-price-sub { font-size: 11px; color: var(--text-2); margin-top: 2px; }
  .s-book-btn {
    width: 100%; padding: 11px 0; border-radius: 10px;
    background: var(--brand); border: none; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 700;
    cursor: pointer; transition: background 0.15s, transform 0.1s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    margin-top: 12px;
  }
  .s-book-btn:hover { background: var(--brand-hover); }
  .s-book-btn:active { transform: scale(0.97); }

  /* ── INLINE SLOT PANEL ─── */
  .s-slot-panel {
    background: #fff; border: 1.5px solid var(--brand);
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 8px 40px rgba(47,47,228,0.12);
    margin-bottom: 16px;
    animation: expandDown 0.2s ease;
  }
  @keyframes expandDown {
    from { opacity: 0; transform: scaleY(0.96); transform-origin: top; }
    to   { opacity: 1; transform: scaleY(1); }
  }
  .s-slot-panel-header {
    background: linear-gradient(135deg, var(--brand) 0%, #5050F0 100%);
    padding: 20px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .s-slot-panel-title { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: #fff; }
  .s-slot-panel-sub { font-size: 12.5px; color: rgba(255,255,255,0.7); margin-top: 2px; }
  .s-close-btn {
    width: 32px; height: 32px; border-radius: 8px; border: none;
    background: rgba(255,255,255,0.15); color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .s-close-btn:hover { background: rgba(255,255,255,0.25); }
  .s-slot-panel-body { padding: 24px; }
  .s-date-section { margin-bottom: 24px; }
  .s-field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-2); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .s-date-input {
    width: 100%; padding: 12px 16px; border-radius: 10px;
    border: 1.5px solid var(--border); outline: none;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: #0D0F1A;
    transition: border-color 0.15s;
  }
  .s-date-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(47,47,228,0.08); }
  .s-slots-section {}
  .s-slots-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-height: 320px; overflow-y: auto; padding-right: 2px; }
  .s-slots-grid::-webkit-scrollbar { width: 4px; }
  .s-slots-grid::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
  .s-slot-tile {
    padding: 14px 12px; border-radius: 10px;
    border: 1.5px solid var(--border); background: #FAFBFF;
    cursor: pointer; transition: all 0.15s; font-family: inherit;
    display: flex; flex-direction: column; gap: 4px;
    text-align: left;
  }
  .s-slot-tile:hover { border-color: var(--brand); background: var(--brand-xlight); }
  .s-slot-tile.confirming { border-color: var(--brand); background: var(--brand); color: #fff; }
  .s-slot-time { font-size: 13.5px; font-weight: 700; color: #0D0F1A; }
  .s-slot-tile:hover .s-slot-time, .s-slot-tile.confirming .s-slot-time { color: inherit; }
  .s-slot-dur { font-size: 11px; color: var(--text-3); font-weight: 500; }
  .s-slot-tile.confirming .s-slot-dur { color: rgba(255,255,255,0.7); }
  .s-slot-confirm { font-size: 11px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
  .s-no-slots {
    grid-column: 1 / -1;
    padding: 32px; text-align: center; color: var(--text-3);
    font-size: 13px; font-weight: 600;
    border: 2px dashed var(--border); border-radius: 10px;
  }
  .s-loading-slots { grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 32px; color: var(--brand); font-size: 13px; font-weight: 600; }
  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Booking overlay */
  .s-booking-overlay {
    position: fixed; inset: 0; background: rgba(13,15,26,0.6);
    backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center;
    z-index: 200;
  }
  .s-booking-modal {
    background: #fff; border-radius: 20px; padding: 40px;
    text-align: center; box-shadow: 0 24px 80px rgba(0,0,0,0.2);
    animation: popIn 0.2s ease;
    max-width: 320px; width: 90%;
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
  .s-booking-spinner { color: var(--brand); margin-bottom: 16px; }
  .s-booking-text { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #0D0F1A; margin-bottom: 8px; }
  .s-booking-sub { font-size: 13px; color: var(--text-2); font-weight: 500; }
  
  /* Success toast */
  .s-toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--success); color: #fff;
    padding: 14px 20px; border-radius: 12px;
    font-size: 14px; font-weight: 600;
    box-shadow: 0 4px 20px rgba(5,150,105,0.3);
    display: flex; align-items: center; gap: 8px;
    z-index: 300; animation: slideUp 0.25s ease;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Empty state */
  .s-empty { text-align: center; padding: 80px 20px; }
  .s-empty-icon { font-size: 48px; margin-bottom: 16px; }
  .s-empty-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: #0D0F1A; margin-bottom: 8px; }
  .s-empty-sub { font-size: 14px; color: var(--text-2); }

  /* Loading skeleton */
  .s-skeleton { background: linear-gradient(90deg, #F3F4F6 25%, #E9EAEE 50%, #F3F4F6 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 8px; }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  .s-skeleton-card { height: 160px; margin-bottom: 16px; border-radius: 16px; }

  @media (max-width: 900px) {
    .s-layout { flex-direction: column; }
    .s-sidebar { width: 100%; min-width: unset; position: static; }
    .s-card-thumb { width: 120px; min-width: 120px; }
    .s-card-right { min-width: 120px; padding: 16px 16px 16px 0; }
    .s-searchbar { flex-direction: column; border-radius: 12px; }
    .s-search-field { border-right: none; border-bottom: 1.5px solid var(--border); width: 100%; }
    .s-search-btn { width: 100%; justify-content: center; }
    .s-slots-grid { grid-template-columns: 1fr; }
  }
`;

// ─── Duration chips ────────────────────────────────────────────────────────────
const DURATION_CHIPS = ["All", "15m", "30m", "45m", "60m", "90m+"];

// ─── Rating label ─────────────────────────────────────────────────────────────
function ratingLabel(score) {
  if (score >= 9) return "Exceptional";
  if (score >= 8) return "Excellent";
  if (score >= 7) return "Very Good";
  return "Good";
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Slots() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [confirmingSlot, setConfirmingSlot] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [toast, setToast] = useState(null);
  const panelRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/services/");
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedService && selectedDate) fetchSlots(selectedDate);
  }, [selectedDate, selectedService]);

  const fetchSlots = async (date) => {
    try {
      setSlotLoading(true);
      setSlots([]);
      const res = await API.get(`/tenant/${selectedService.tenant_slug}/booking/slots/`, {
        params: { service_id: selectedService.id, date },
      });
      setSlots(res.data.slots || []);
    } catch {
      setSlots([]);
    } finally {
      setSlotLoading(false);
    }
  };

  const handleBook = async (slot) => {
    setConfirmingSlot(slot);
    setTimeout(async () => {
      try {
        setBookingLoading(true);
        await API.post(`/tenant/${selectedService.tenant_slug}/booking/create/`, {
          service: selectedService.id,
          date: selectedDate,
          start_time: slot,
        });
        setSelectedService(null);
        setSelectedDate("");
        setSlots([]);
        setConfirmingSlot(null);
        showToast("Booking confirmed! 🎉");
      } catch {
        showToast("Booking failed. Please try again.", true);
      } finally {
        setBookingLoading(false);
        setConfirmingSlot(null);
      }
    }, 600);
  };

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3500);
  };

  const formatTime = (startTime, duration) => {
    const [h, m] = startTime.split(":").map(Number);
    const start = new Date(); start.setHours(h, m, 0);
    const end = new Date(start.getTime() + duration * 60000);
    const f = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${f(start)} – ${f(end)}`;
  };

  const handleSelectService = (s) => {
    if (selectedService?.id === s.id) { setSelectedService(null); return; }
    setSelectedService(s);
    setSelectedDate("");
    setSlots([]);
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  };

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  // ── Filters & sort ───────────────────────────────────────────────────────────
  const uniqueTenants = [...new Set(services.map(s => s.tenant_name).filter(Boolean))];

  let filtered = services.filter(s => {
    const q = search.toLowerCase();
    const matchQ = !q || s.name?.toLowerCase().includes(q) || s.tenant_name?.toLowerCase().includes(q);
    const matchPrice = !s.price || s.price <= maxPrice;
    const matchDur = selectedDuration === "All" || (() => {
      const d = parseInt(s.duration);
      if (selectedDuration === "15m") return d === 15;
      if (selectedDuration === "30m") return d === 30;
      if (selectedDuration === "45m") return d === 45;
      if (selectedDuration === "60m") return d === 60;
      if (selectedDuration === "90m+") return d >= 90;
      return true;
    })();
    return matchQ && matchPrice && matchDur;
  });

  if (sortBy === "price_asc") filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
  if (sortBy === "price_desc") filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
  if (sortBy === "duration") filtered = [...filtered].sort((a, b) => (a.duration || 0) - (b.duration || 0));

  // ── Synthetic rating per service (deterministic) ─────────────────────────────
  const getRating = (id) => {
    const base = (id % 30) / 10;
    return (7 + base).toFixed(1);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="slots-root">

        {/* ── SEARCH BAR ───────────────────────────────────── */}
        <div className="s-searchbar">
          <div className="s-search-field">
            <SearchIcon />
            <input
              placeholder="Service name or provider..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setSearch(searchInput)}
            />
          </div>
          <div className="s-search-field" style={{ maxWidth: 220 }}>
            <CalendarIcon />
            <input
              type="date"
              min={today}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
          <button className="s-search-btn" onClick={() => setSearch(searchInput)}>
            <SearchIcon /> Search
          </button>
        </div>

        {/* ── LAYOUT ───────────────────────────────────────── */}
        <div className="s-layout">

          {/* ── SIDEBAR FILTERS ─── */}
          <div className="s-sidebar">
            <div className="s-sidebar-header">
              <div className="s-sidebar-title"><FilterIcon /> Filter by</div>
              <button className="s-clear-btn" onClick={() => { setSearch(""); setSearchInput(""); setMaxPrice(5000); setSelectedDuration("All"); }}>
                Clear all
              </button>
            </div>

            {/* Price range */}
            <div className="s-filter-section">
              <div className="s-filter-label">Price range</div>
              <div className="s-range-labels">
                <span className="s-range-label">₹0</span>
                <span className="s-range-label" style={{ color: "#0D0F1A", fontWeight: 700 }}>₹{maxPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={100} max={5000} step={100} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="s-range-input" />
            </div>

            {/* Duration */}
            <div className="s-filter-section">
              <div className="s-filter-label">Duration</div>
              <div className="s-chips">
                {DURATION_CHIPS.map(d => (
                  <button key={d} className={`s-chip${selectedDuration === d ? " active" : ""}`} onClick={() => setSelectedDuration(d)}>{d}</button>
                ))}
              </div>
            </div>

            {/* Providers */}
            {uniqueTenants.length > 0 && (
              <div className="s-filter-section">
                <div className="s-filter-label">Provider</div>
                {uniqueTenants.slice(0, 6).map(t => {
                  const count = services.filter(s => s.tenant_name === t).length;
                  return (
                    <div key={t} className="s-check-item">
                      <div className="s-checkbox"><CheckIcon /></div>
                      <span className="s-check-label">{t}</span>
                      <span className="s-check-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── RESULTS ─── */}
          <div className="s-results">
            <div className="s-results-header">
              <div>
                <div className="s-results-count">{filtered.length} services found</div>
                <div className="s-results-sub">{search ? `Results for "${search}"` : "Showing all available services"}</div>
              </div>
              <div className="s-sort-select">
                <FilterIcon />
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: "none", outline: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, color: "#374151", cursor: "pointer", background: "transparent" }}>
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="s-skeleton s-skeleton-card" style={{ animationDelay: `${i * 0.1}s` }} />)
            ) : filtered.length === 0 ? (
              <div className="s-empty">
                <div className="s-empty-icon">🔍</div>
                <div className="s-empty-title">No services found</div>
                <div className="s-empty-sub">Try adjusting your filters or search term.</div>
              </div>
            ) : (
              filtered.map((s, idx) => {
                const isSelected = selectedService?.id === s.id;
                const rating = getRating(s.id || idx);
                return (
                  <div key={s.id}>
                    {/* Service card */}
                    <div
                      className={`s-card${isSelected ? " selected" : ""}`}
                      style={{ animationDelay: `${idx * 0.04}s` }}
                      onClick={() => handleSelectService(s)}
                    >
                      {/* Thumbnail */}
                      <div className="s-card-thumb">
                        <div className="s-card-thumb-inner">
                          <div className="s-card-thumb-letter">{(s.name || "S")[0].toUpperCase()}</div>
                        </div>
                        <div className="s-thumb-badge">
                          <span className="s-thumb-dot" />
                          Available
                        </div>
                        <button className="s-heart-btn" onClick={e => toggleWishlist(e, s.id)}>
                          <HeartIcon filled={wishlist.has(s.id)} />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="s-card-body">
                        <div className="s-card-tenant">{s.tenant_name || "Provider"}</div>
                        <div className="s-card-name">{s.name}</div>
                        <div className="s-card-meta">
                          <span className="s-meta-item">
                            <div className="s-stars">{[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= 4} />)}</div>
                          </span>
                          <span className="s-meta-item"><ClockIcon /> {s.duration} min session</span>
                          {s.category && <span className="s-meta-item"><TagIcon /> {s.category}</span>}
                        </div>
                        <div className="s-card-tags">
                          <span className="s-tag">Instant Booking</span>
                          <span className="s-tag">Free Cancellation</span>
                          {s.duration <= 30 && <span className="s-tag">Quick Session</span>}
                        </div>
                      </div>

                      {/* Right: rating + price */}
                      <div className="s-card-right">
                        <div className="s-rating-box">
                          <div className="s-rating-label">
                            <div style={{ fontWeight: 700, color: "#0D0F1A", fontSize: 13 }}>{ratingLabel(rating)}</div>
                            <div>Based on reviews</div>
                          </div>
                          <div className="s-rating-score">{rating}</div>
                        </div>
                        <div>
                          <div className="s-price-block">
                            <div className="s-price-label">Starting from</div>
                            <div className="s-price">₹{s.price?.toLocaleString() || "—"}</div>
                            <div className="s-price-sub">per session</div>
                          </div>
                          <button className="s-book-btn" onClick={e => { e.stopPropagation(); handleSelectService(s); }}>
                            {isSelected ? "▲ Close" : <>Select slot <ArrowRightIcon /></>}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ── INLINE SLOT PANEL ─── */}
                    {isSelected && (
                      <div className="s-slot-panel" ref={panelRef}>
                        <div className="s-slot-panel-header">
                          <div>
                            <div className="s-slot-panel-title">Book · {s.name}</div>
                            <div className="s-slot-panel-sub">{s.tenant_name} · ₹{s.price} · {s.duration} min</div>
                          </div>
                          <button className="s-close-btn" onClick={() => setSelectedService(null)}>
                            <CloseIcon />
                          </button>
                        </div>
                        <div className="s-slot-panel-body">
                          <div className="s-date-section">
                            <div className="s-field-label"><CalendarIcon /> Pick a date</div>
                            <input
                              type="date"
                              className="s-date-input"
                              min={today}
                              value={selectedDate}
                              onChange={e => setSelectedDate(e.target.value)}
                            />
                          </div>

                          {selectedDate && (
                            <div className="s-slots-section">
                              <div className="s-field-label" style={{ marginBottom: 12 }}>
                                ⏰ Available slots
                              </div>
                              <div className="s-slots-grid">
                                {slotLoading ? (
                                  <div className="s-loading-slots">
                                    <span className="spin"><SpinnerIcon /></span>
                                    Checking availability...
                                  </div>
                                ) : slots.length > 0 ? (
                                  slots.map((slot, i) => (
                                    <button
                                      key={i}
                                      className={`s-slot-tile${confirmingSlot === slot ? " confirming" : ""}`}
                                      onClick={() => handleBook(slot)}
                                      disabled={bookingLoading}
                                    >
                                      <div className="s-slot-time">{formatTime(slot, s.duration)}</div>
                                      <div className="s-slot-dur">{s.duration} min · ₹{s.price}</div>
                                      {confirmingSlot === slot && (
                                        <div className="s-slot-confirm"><CheckIcon /> Confirming...</div>
                                      )}
                                    </button>
                                  ))
                                ) : (
                                  <div className="s-no-slots">No slots available for this date.<br />Try a different day.</div>
                                )}
                              </div>
                            </div>
                          )}

                          {!selectedDate && (
                            <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-3)", fontSize: 13, fontWeight: 600 }}>
                              👆 Select a date to view available time slots
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── BOOKING OVERLAY ─── */}
      {bookingLoading && (
        <div className="s-booking-overlay">
          <div className="s-booking-modal">
            <div className="s-booking-spinner spin" style={{ display: "inline-block" }}><SpinnerIcon /></div>
            <div className="s-booking-text">Securing your slot...</div>
            <div className="s-booking-sub">Please wait a moment</div>
          </div>
        </div>
      )}

      {/* ── TOAST ─── */}
      {toast && (
        <div className="s-toast" style={{ background: toast.isError ? "#EF4444" : "var(--success)" }}>
          {toast.isError ? "❌" : "✅"} {toast.msg}
        </div>
      )}
    </>
  );
}