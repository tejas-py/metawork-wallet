import React from 'react'

export default function AnalyticsDashboard() {

  function Stats() {
    return (
      <div className="stats stats-horizontal font-montserrat shadow-md bg-white">
        <div className="stat">
          <div className="stat-title">Active Users Monthly</div>
          <div className="stat-value">12</div>
          <div className="stat-desc">March 19th - Present</div>
        </div>

        <div className="stat">
          <div className="stat-title">Active Users Weekly</div>
          <div className="stat-value">123</div>
          <div className="stat-desc">March 19th - Present</div>
        </div>

        <div className="stat">
          <div className="stat-title">Active Users Daily</div>
          <div className="stat-value">123</div>
          <div className="stat-desc">March 19th - Present</div>
        </div>
      </div>
    )
  }

  function Graph() {
    return (
      <div class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div class="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
          <div class="w-max rounded-lg bg-gray-900 p-5 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
              ></path>
            </svg>
          </div>
          <div>
            <h6 class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
              Line Chart
            </h6>
            <p class="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
              Visualize your data in a simple way using the @material-tailwind/html chart plugin.
            </p>
          </div>
        </div>
        <div class="pt-6 px-2 pb-0">
          <div id="line-chart"></div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col justify-start">
      <Stats />
    </div>
  )
}
