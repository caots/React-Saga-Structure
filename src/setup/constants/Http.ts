export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUEST: 429,
  SERVER_ERROR: 500
}

export const HTTP_RESPONSE_STATUS = {
  ERROR: -1,
  FAILED: 0,
  SUCCESS: 1,
  RETRY: 2,
  EXCEPTION: 3
}

export const COMMON_ERROR = {
  pleaseTryAgain: "Error, please try again.",
  forbidden: "Forbidden.",
};