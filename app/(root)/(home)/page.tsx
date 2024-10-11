import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import FilterButton from "@/components/shared/FilterButton";
import IconButton from "@/components/shared/IconButton";
import NoResult from "@/components/shared/NoResult";
import PureButton from "@/components/shared/PureButton";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import DataTable from "@/components/shared/Table/DataTable";
import SimpleDataTable from "@/components/shared/Table/UnicoreTable/SimpleDataTable";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import FORMATTER from "@/utils/formatter";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title:
      "How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      picture: "jane-smith.jpg",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "1",
      name: "Jhon Doe",
      picture: "john-doe.jpg",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div
        className="
      flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
        <div className="flex-center">
          <LocalSearchbar
            route="/"
            iconPosition="right"
            imgSrc="/assets/icons/search.svg"
            placeholder="Tìm kiếm thông báo"
            otherClasses="flex-1 mr-6"
          />

          <FilterButton />
        </div>

        <Link href="/create-announcement">
          <IconButton text="Tạo thông báo" />
        </Link>
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">

        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
