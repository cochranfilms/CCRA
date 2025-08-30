declare module '@emailjs/browser' {
  export function init(options: { publicKey: string }): void;
  export function send(
    serviceId: string,
    templateId: string,
    params?: Record<string, string | number | boolean | null | undefined>,
    publicKeyOrOptions?: string | { publicKey: string }
  ): Promise<{ status: number; text: string }>;
  const _default: { init: typeof init; send: typeof send };
  export default _default;
}


