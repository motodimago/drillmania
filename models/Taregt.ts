export enum AnswerType {
  Yes,
  No
}
export default class Target {
  constructor(
    readonly imageName: string,
    readonly answerType: AnswerType,
    readonly answerName: string
  ) {}
}
