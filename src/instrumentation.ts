import { APP_NAME } from "./constants";
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel(APP_NAME);
}
