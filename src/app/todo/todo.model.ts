export class TodoCollection {
  constructor(
    public name: string,
    public color: string,
    public dueDate: string,
    public done: boolean = false
  ) { }
}
