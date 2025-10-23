import {
  AcademicCapIcon,
  ChartPieIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-blue-500">
                TaskNest
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
            <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
              <div className="mb-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  Boost your
                  <span className="text-blue-500 block">productivity.</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform the way you manage tasks with our intuitive
                  platform. Stay organized, focused, and achieve more every day.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link href="/register">
                  <button className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Get Started Free
                  </button>
                </Link>
                <Link href="/demo">
                  <button className="px-8 py-4 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-blue-200 hover:text-blue-600 transition-all">
                    Watch Demo
                  </button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Smart Organization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Team Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real-time Sync</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 mt-16 lg:mt-0">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-2xl border border-blue-100">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Today's Tasks
                      </h3>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Review project proposal
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-1 bg-white rounded"></div>
                        </div>
                        <span className="text-gray-500 line-through">
                          Team meeting prep
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Update documentation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
                  <div className="text-white text-2xl">✓</div>
                </div>

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently
              and collaborate seamlessly with your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 flex justify-center items-center bg-blue-500 rounded-lg">
                  <AcademicCapIcon className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Organization
              </h3>
              <p className="text-gray-600">
                Automatically categorize and prioritize your tasks with
                intelligent algorithms.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full">
                  <UsersIcon className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Work together seamlessly with real-time updates and shared
                workspaces.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-xl transform rotate-45">
                  <ChartPieIcon className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Track your productivity with detailed analytics and performance
                insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
