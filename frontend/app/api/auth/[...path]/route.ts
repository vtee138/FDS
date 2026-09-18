import { NextRequest, NextResponse } from "next/server";
import { getBackendBase } from "@/lib/auth/config";

type RouteParams = { params: Promise<{ path: string[] }> };

/**
 * Proxy same-origin cho auth để forward HttpOnly cookie.
 * /api/auth/<seg...> -> <BACKEND>/auth/<seg...>
 * Forward: Cookie, Content-Type, Accept.
 * Trả về: body + status + Set-Cookie từ backend.
 */
async function proxy(req: NextRequest, path: string[]) {
  if (path.some((seg) => seg === ".." || seg.includes("\\"))) {
    return NextResponse.json(
      { message: "Đường dẫn không hợp lệ." },
      { status: 400 }
    );
  }

  const backendBase = getBackendBase();
  const search = req.nextUrl.search ?? "";
  const target = `${backendBase}/auth/${path.join("/")}${search}`;

  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  headers.set("accept", "application/json");
  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      body = await req.text();
    } catch {
      body = undefined;
    }
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(target, {
      method: req.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return NextResponse.json(
      { message: "Không kết nối được máy chủ. Vui lòng thử lại sau." },
      { status: 502 }
    );
  }

  const resBody = await backendRes.text();
  const res = new NextResponse(resBody, { status: backendRes.status });
  const resContentType = backendRes.headers.get("content-type");
  if (resContentType) res.headers.set("content-type", resContentType);

  const setCookies =
    typeof backendRes.headers.getSetCookie === "function"
      ? backendRes.headers.getSetCookie()
      : backendRes.headers.get("set-cookie")
        ? [backendRes.headers.get("set-cookie") as string]
        : [];
  for (const c of setCookies) {
    res.headers.append("set-cookie", c);
  }

  return res;
}

export async function GET(req: NextRequest, ctx: RouteParams) {
  const { path } = await ctx.params;
  return proxy(req, path ?? []);
}

export async function POST(req: NextRequest, ctx: RouteParams) {
  const { path } = await ctx.params;
  return proxy(req, path ?? []);
}

export async function PATCH(req: NextRequest, ctx: RouteParams) {
  const { path } = await ctx.params;
  return proxy(req, path ?? []);
}

export async function PUT(req: NextRequest, ctx: RouteParams) {
  const { path } = await ctx.params;
  return proxy(req, path ?? []);
}

export async function DELETE(req: NextRequest, ctx: RouteParams) {
  const { path } = await ctx.params;
  return proxy(req, path ?? []);
}
