export class Experience {
  constructor(
    public readonly experienceId: string,
    public readonly position: string,
    public readonly company: string,
    public readonly creator: string,
    public readonly startDate: string,
    public readonly endDate: string | null,
  ) {}
}
