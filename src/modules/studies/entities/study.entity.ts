export class Study {
  constructor(
    public readonly stadieId: string,
    public readonly title: string,
    public readonly level: string,
    public readonly status: string,
    public readonly startDate: string,
    public readonly creator: string,
    public readonly endDate: string | null,
  ) {}
}
