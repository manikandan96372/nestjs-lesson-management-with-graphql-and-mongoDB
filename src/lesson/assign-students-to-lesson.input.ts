import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class AssignStudentsToLesson {
    @Field(type => ID)
    lessonId: string;

    @Field(type => [ID])
    studentsIds: string[]
}