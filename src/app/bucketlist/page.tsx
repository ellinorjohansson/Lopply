import { useTranslation } from "@/common/hooks/useTranslation";

const Bucketlist = () => {
  const b = useTranslation("bucketlist");
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-18 mt-18 md:mt-25 md:mb-25 md:ml-0 ml-3">
          <h2 className="text-6xl sm:pl-9 md:text-7xl">
            {b("my_bucketlist")}
          </h2>

          <p className="sm:pl-9 mt-1 md:mt-4 mb-6 text-1xl md:text-2xl">
            {b("bucketlist_subtext")}
          </p>
        </div>
      </section>
    </main>
  )
}

export default Bucketlist;