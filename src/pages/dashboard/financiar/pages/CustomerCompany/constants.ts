/**
 * Constants for CustomerCompany module
 */

// Form validation patterns
export const PHONE_NUMBER_PATTERN = /^[1-9]{1}[0-9]{7}$/g;
export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

// Form validation messages
export const PHONE_NUMBER_ERROR_MESSAGE = "Энэ талбар утасны дугаар байх ёстой";
export const EMAIL_ERROR_MESSAGE = "Энэ талбар и-мэйл хаяг байх ёстой";

// Table column widths
export const COLUMN_WIDTHS = {
  BROKER: "200",
  LEDGER: "200",
  EMAIL: "10%",
  CREATED_BY: "10%"
};

// Modal titles
export const MODAL_TITLES = {
  CREATE: "Харилцагч компани нэмэх",
  UPDATE: "Засах",
  VIEW: "Харилцагч компанийн мэдээлэл"
};

// Button texts
export const BUTTON_TEXTS = {
  CANCEL: "Буцах",
  SAVE: "Хадгалах",
  ADD: "Нэмэх"
};

// Search placeholder
export const SEARCH_PLACEHOLDER = "Нэр, данс";

// File name for export
export const EXPORT_FILENAME = "Харилцагч компанийн жагсаалт"; 