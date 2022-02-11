import { Injectable } from '@nestjs/common';
import { LessonSchedule } from '../../entities/lesson-schedule.entity';
import { LessonCancelled } from '../../entities/lesson-cancelled.entity';
import { LessonException } from '../../entities/lesson-exception.entity';

@Injectable()
export class LessonFetchEngineService {
  /**
   * Formats the lesson schedule by fetching, removing canceled lessons,
   * replace exception lessons and then sorts by date.
   *
   * @param lessonSchedule
   * @return Record<string, any>
   */
  format(lessonSchedule: LessonSchedule): Record<string, any>[] {
    // 1. fetch lessons from lesson schedule
    let lessons = this.fetchLessons(lessonSchedule);

    // 2. remove cancelled lessons from the lessons array
    lessons = this.removeCancelledLessons(
      lessons,
      lessonSchedule.lessonCancelled,
    );

    // 3. replace exception lessons
    lessons = this.replaceExceptionLessons(
      lessons,
      lessonSchedule.lessonException,
    );

    // 4. sort lessons by date ascending
    lessons = this.sortLessons(lessons);

    return lessons;
  }

  /**
   * Fetch lessons from lesson schedule
   *
   * @param lessonSchedule
   * @return Record<string, any>
   */
  fetchLessons(lessonSchedule: LessonSchedule): Record<string, any>[] {
    const lessons = [];
    // If no recurrence plan && lesson date is not in canceled list
    if (
      !lessonSchedule.lessonRecurrencePlan &&
      lessonSchedule.lessonCancelled.filter(
        (lessonCancelled) =>
          new Date(lessonSchedule.date).toDateString() ===
          new Date(lessonCancelled.lessonScheduledDate).toDateString(),
      ).length === 0
    ) {
      lessons.push({
        title: lessonSchedule.title,
        description: lessonSchedule.description,
        date: lessonSchedule.date,
        createdAt: lessonSchedule.createdAt,
        updatedAt: lessonSchedule.updatedAt,
      });
    }
    // If there is a recurrence plan
    else if (lessonSchedule.lessonRecurrencePlan) {
      let currDate = new Date(lessonSchedule.date).toDateString();
      do {
        // Get current day name => saturday, sunday, etc..
        const currDayName = new Date(currDate)
          .toLocaleDateString('en', { weekday: 'long' })
          .toLowerCase();
        // If (recurrence plan is daily) or (recurrence plan is weekly and current day name is enabled in weekly pattern)
        if (
          lessonSchedule.lessonRecurrencePlan.isDaily ||
          lessonSchedule.lessonRecurrencePlan[currDayName]
        ) {
          lessons.push({
            title: lessonSchedule.title,
            description: lessonSchedule.description,
            date: currDate,
            createdAt: lessonSchedule.createdAt,
            updatedAt: lessonSchedule.updatedAt,
          });
        }
        // Increment By 1 Day
        currDate = new Date(
          new Date(currDate).getTime() + 24 * 60 * 60 * 1000, // 24 hrs * 60 mins * 60 secs * 1000ms
        ).toDateString();
      } while (
        currDate !==
          new Date(
            lessonSchedule.lessonRecurrencePlan.endDate,
          ).toDateString() &&
        lessons.length < 1000
      );
    }
    return lessons;
  }

  /**
   * Remove cancelled lessons from the lessons array
   *
   * @param lessons
   * @param cancelledLessons
   * @return Record<string, any>
   */
  removeCancelledLessons(
    lessons: Record<string, any>[],
    cancelledLessons: LessonCancelled[],
  ): Record<string, any>[] {
    cancelledLessons.forEach((canceledLesson) => {
      if (canceledLesson.cancelAfter) {
        lessons = lessons.filter(
          (lesson) =>
            new Date(lesson.date).getTime() <
            new Date(canceledLesson.lessonScheduledDate).getTime(),
        );
      } else {
        lessons = lessons.filter(
          (lesson) =>
            lesson.date !==
            new Date(canceledLesson.lessonScheduledDate).toDateString(),
        );
      }
    });
    return lessons;
  }

  /**
   * Replace exception lessons
   *
   * @param lessons
   * @param exceptionLessons
   * @return Record<string, any>
   */
  replaceExceptionLessons(
    lessons: Record<string, any>[],
    exceptionLessons: LessonException[],
  ): Record<string, any>[] {
    exceptionLessons.forEach((exceptionLesson) => {
      const lessonIndex = lessons.findIndex(
        (lesson) =>
          lesson.date ===
          new Date(exceptionLesson.scheduledDate).toDateString(),
      );

      if (lessonIndex > -1) {
        lessons[lessonIndex] = {
          ...lessons[lessonIndex],
          title: exceptionLesson.newTitle || lessons[lessonIndex].title,
          description:
            exceptionLesson.newDescription || lessons[lessonIndex].description,
          date: exceptionLesson.newDate || lessons[lessonIndex].date,
        };
      }
    });
    return lessons;
  }

  /**
   * Sort lessons by date ascending
   *
   * @param lessons
   * @return Record<string, any>
   */
  sortLessons(lessons: Record<string, any>[]): Record<string, any>[] {
    lessons.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    return lessons;
  }
}
