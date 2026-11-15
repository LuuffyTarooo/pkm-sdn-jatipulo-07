declare module 'node:sqlite' {
  export interface RunResult {
    changes: number;
    lastInsertRowid: number | bigint;
  }

  export interface StatementSync {
    all(...params: unknown[]): Record<string, unknown>[];
    get(...params: unknown[]): Record<string, unknown> | undefined;
    run(...params: unknown[]): RunResult;
  }

  export class DatabaseSync {
    constructor(location: string, options?: { open?: boolean; readOnly?: boolean; enableForeignKeyConstraints?: boolean });
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
