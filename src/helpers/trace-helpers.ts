
import { APP_NAME } from '@/constants'
import { trace } from '@opentelemetry/api'

export const enum Spans {
    IntlMiddleware = "intl-middleware",
    LoadMessages = "load-messages",
    LoadBlogFile = "load-blog-file",
}

export const tracer = trace.getTracer(APP_NAME);