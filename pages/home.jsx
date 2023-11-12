import ProfileBox from '../src/components/ProfileBox/ProfileBox';
import RightArrow from '../src/components/Icons/RightArrow';
// relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:blur-2xl after:content-[''] before:dark:opacity-10 after:dark:opacity-40 before:lg:h-[360px] z-[-1]

export default function Home() {
  return (
    <div className="relative w-full h-full">
    <div className="absolute top-1/2 right-36">
      <RightArrow />
    </div>
    <div className="bg-gray-200">
      <div className="mx-auto mt-10 w-1/2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a>
            <img className="rounded-t-lg" src="/images/happy_guy.jpg" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
              {/* HAVE TO REPLACE WITH THE ACTUAL PERSON'S NAME */}
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Jeremy, 22</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Major(s):</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Minor(s):</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Courses:</p>
        </div>
      </div>
    </div>
  </div>
  );
}
