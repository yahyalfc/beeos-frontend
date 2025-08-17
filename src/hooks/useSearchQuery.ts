import { useSearchParams, useRouter, usePathname } from "next/navigation";

type ParamValue = string | string[] | null;
interface ParamEntry {
  key: string;
  value: ParamValue;
}

export const useSearchQuery = (pathnameManual?: string) => {
  const router = useRouter();
  const pathnameNext = usePathname();
  const pathname = pathnameManual ?? pathnameNext;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(Array.from(searchParams.entries()));

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const setParams = (keys: string | ParamEntry[], value?: ParamValue) => {
    if (typeof keys === "string") {
      const key = keys;
      if (!value) {
        params.delete(key);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        return;
      }

      if (Array.isArray(value)) {
        params.delete(key); // Clear existing values
        value.forEach((val) => {
          if (val && val.trim() !== "false") {
            params.append(key, val.trim());
          }
        });
      } else {
        const trimValue = value.trim();

        if (trimValue === "false") {
          params.delete(key);
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
          return;
        }

        params.set(key, trimValue);
      }

      const search = params.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`, { scroll: false });
    } else {
      for (const { key, value } of keys) {
        if (!value) {
          params.delete(key);
          continue;
        }

        if (Array.isArray(value)) {
          params.delete(key); // Clear existing values
          value.forEach((val) => {
            if (val && val.trim() !== "false") {
              params.append(key, val.trim());
            }
          });
        } else {
          const trimValue = value.trim();
          // eslint-disable-next-line max-depth
          if (trimValue === "false") {
            params.delete(key);
            continue;
          }

          params.set(key, trimValue);
        }
      }

      const search = params.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    }
  };

  const getUnifiedParams = (key: string): string => {

    const values = searchParams.getAll(key);
    if (values.length === 0) return "";

    return values
      .map((value) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  };

  const getParams = (key: string): string | null => {
    return searchParams.get(key);
  };

  const getAllParams = (key: string): string[] | null => {
    const values = searchParams.getAll(key);
    return values.length > 0 ? values : null;
  };

  const deleteParams = (key: string) => {
    params.delete(key);
    router.push(pathname, { scroll: false });
  };

  const deleteAllParams = () => {
    Array.from(params.keys()).forEach((key) => {
      params.delete(key);
    });

    router.push(pathname, { scroll: false });
  };

  return {
    ...searchParams,
    getParams,
    getAllParams,
    getUnifiedParams,
    deleteParams,
    deleteAllParams,
    setParams,
  };
};
