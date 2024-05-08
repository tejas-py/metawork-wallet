import React from 'react'

export default function SkeletonLoading() {
  function StatSkeleton() {
    return (
      <div className="stats shadow-md bg-white">
        <div className="skeleton bg-opacity-10">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-montserrat">Investments</div>
            <div className="stat-value font-montserrat">$0</div>
          </div>
        </div>

        <div className="skeleton bg-opacity-10">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title font-montserrat">Yield</div>
            <div className="stat-value font-montserrat">$0</div>
          </div>
        </div>
      </div>
    )
  }

  function TableSkeleton() {
    return (
      <table className="table">
        {/* head */}
        <thead className="font-montserrat">
          <tr>
            <th>Bonds</th>
            <th>Investment</th>
            <th>Yield</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {/* 1 */}
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-7 h-7 lg:w-16 lg:h-16">
                    <div class="skeleton rounded-full w-7 h-7 lg:w-16 lg:h-16 shrink-0"></div>
                  </div>
                </div>
                <div>
                  <div class="skeleton h-5 w-16"></div>
                  <div class="skeleton h-3 w-7 mt-1"></div>
                </div>
              </div>
            </td>
            <td>
              <div class="skeleton h-5 w-16"></div>
              <div class="skeleton h-3 w-7 mt-1"></div>
            </td>
            <th>
              <button className="btn btn-ghost btn-xs">View</button>
            </th>
            <th>
              <button className="btn btn-ghost btn-xs">View</button>
            </th>
          </tr>
          {/* 2 */}
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-7 h-7 lg:w-16 lg:h-16">
                    <div class="skeleton rounded-full w-7 h-7 lg:w-16 lg:h-16 shrink-0"></div>
                  </div>
                </div>
                <div>
                  <div class="skeleton h-5 w-16"></div>
                  <div class="skeleton h-3 w-7 mt-1"></div>
                </div>
              </div>
            </td>
            <td>
              <div class="skeleton h-5 w-16"></div>
              <div class="skeleton h-3 w-7 mt-1"></div>
            </td>
            <th>
              <button className="btn btn-ghost btn-xs">View</button>
            </th>
            <th>
              <button className="btn btn-ghost btn-xs">View</button>
            </th>
          </tr>
        </tbody>
      </table>
    )
  }
  return (
    <div className="flex flex-col justify-center">
      <StatSkeleton />
      <div className="overflow-x-auto relative my-20 border rounded-md shadow-md">
        <TableSkeleton />
      </div>
    </div>
  )
}
