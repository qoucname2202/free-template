// import {
//   useNavigate,
//   useLocation,
//   useParams,
//   useRouteMatch,
// } from 'react-router';
// import { useMemo } from 'react';
// import queryString from 'query-string';
import dayjs from 'dayjs';
import lodash from 'lodash';

export const indexOfArrayObject = (array: any[], key: string, value: any) => {
  if (!Array.isArray(array)) {
    return;
  }
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item[key] === value) {
      index = i;
      break;
    }
  }
  return index;
};

export const debounce = (callback: any, delay: number) => {
  return lodash.debounce(callback, delay);
};

export const onScrollBottom = (callBack: any) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event);
    }
  };
};

export function roundToTwo(num: string) {
  return Number.parseFloat(num).toFixed(2);
}

// export function useRouter() {
//   const params = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const match = useRouteMatch();

//   // Return our custom router object
//   // Memoize so that a new object is only returned if something changes
//   return useMemo(() => {
//     return {
//       // For convenience add push(), replace(), pathname at top level
//       push: navigate,
//       replace: navigate(match, { replace: true }),
//       pathname: location.pathname,
//       // Merge params and parsed query string into single "query" object
//       // so that they can be used interchangeably.
//       // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
//       query: {
//         ...queryString.parse(location.search), // Convert string to object
//         ...params,
//       },
//       // Include match, location, history objects so we have
//       // access to extra React Router functionality if needed.
//       match,
//       location,
//     };
//   }, [params, match, location]);
// }

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.random();
  return Math.floor(random * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end);
};

export const getCookie = (cname: string) => {
  const name = cname + '=';
  const decodedCookie: string = decodeURIComponent(document.cookie) || '';
  if (decodedCookie == null || decodedCookie === '') {
    return '';
  }
  const cookieValue = decodedCookie
    .split('; ')
    ?.find(row => row.startsWith(name))
    ?.split('=')[1];
  return cookieValue || '';
};

export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const toFirstLowerCase = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function sessionStorageSetItem(key: string, data: any) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function sessionStorageGetItem(key: string) {
  const dataJson = sessionStorage.getItem(key);
  if (dataJson != null) {
    return JSON.parse(dataJson);
  } else {
    return undefined;
  }
}

export const delay = (milliSecond: any) => new Promise(resolve => setTimeout(resolve, milliSecond));

export const counterNumber = (value: number) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000);
    // return (value / 1000000)?.toFixed(3)?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else if (value >= 1000) {
    return Math.floor(value / 1000);
    // return (value / 1000)?.toFixed(3)?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    return value;
  }
};

export const dateToString = (date: any, format: string) => {
  if (!dayjs(date).isValid()) {
    return '';
  }
  return dayjs(date).format(format);
};
export const removeNullFields = values => {
  for (const key in values) {
    if (values[key] === null) {
      values[key] = undefined;
    }
  }
  return values;
};
export const roundOff = (num: number | null | undefined, decimal_places: number = 2) => {
  if (num === null || num === undefined) {
    return '--';
  }
  return parseFloat(num.toFixed(decimal_places));
};
export const isWithinInterval = (
  intervalStart: any,
  intervalEnd: any,
  currentTime: any = dayjs(),
) => {
  intervalStart = dayjs(intervalStart);
  intervalEnd = dayjs(intervalEnd);
  currentTime = dayjs(currentTime);

  if (!intervalStart.isValid() || !intervalEnd.isValid() || !currentTime.isValid()) {
    return 0;
  }

  if (currentTime.isBefore(intervalStart)) {
    return 1;
  }
  if (currentTime.isBetween(intervalStart, intervalEnd)) {
    return 2;
  }
  if (currentTime.isAfter(intervalEnd)) {
    return 3;
  }
};
