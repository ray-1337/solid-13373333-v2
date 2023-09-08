'use client';

import type { ImageLoaderProps } from "next/image";
import { cdnDomain } from "../../config";

export default function ({ src }: ImageLoaderProps) {
  return `https://${cdnDomain}${src}`;
};