import React from 'react'

export default function SkeletonLoading() {
  function StatSkeleton() {
    return (
      <div className="stats stats-horizontal font-montserrat shadow-md bg-white">
        <div className="skeleton bg-opacity-10">
          <div className="stat">
            <div className="stat-title">All Investors</div>
            <div className="stat-value text-transparent">0</div>
            <div className="stat-desc text-transparent">March 19th - Present</div>
          </div>
        </div>

        <div className="skeleton bg-opacity-10">
          <div className="stat">
            <div className="stat-title">Total Investment</div>
            <div className="stat-value text-transparent">0</div>
            <div className="stat-desc text-transparent">↗︎ $400 (22%) - weekly</div>
          </div>
        </div>

        <div className="skeleton bg-opacity-10">
          <div className="stat">
            <div className="stat-title">Total Yield</div>
            <div className="stat-value text-transparent">0</div>
            <div className="stat-desc text-transparent">↘︎ $90 (14%) - weekly</div>
          </div>
        </div>
      </div>
    )
  }

  function TableSkeleton() {
    return (
      <div className="overflow-x-auto border rounded-md shadow-lg mt-12">
        <table className="table">
          {/* head */}
          <thead className="font-montserrat">
            <tr>
              <th>Name</th>
              <th>Total Invested</th>
              <th>Last Online</th>
              <th>Trade History</th>
              <th>Block/Unblock</th>
            </tr>
          </thead>
          <tbody>
            {/* 1 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
            {/* 2 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
            {/* 3 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
            {/* 4 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
            {/* 5 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
            {/* 6 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
            {/* 7 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
            {/* 8 */}
            <tr>
              <td>
                <div className="skeleton bg-opacity-20">
                  <div className="flex items-center gap-3">
                    <div className="avatar hover:cursor-pointer">
                      <div className="mask mask-squircle w-5 h-5"></div>
                    </div>
                    <div>
                      <div className="font-bold text-transparent">NO NAME</div>
                      <div className="text-sm opacity-50 text-transparent">HHAKHJAL</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  0
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <td className="text-transparent">
                <div className="skeleton bg-opacity-20">
                  TIME
                  <br />
                  <span className="badge badge-ghost badge-sm bg-transparent text-transparent border-0">
                    LOADING
                  </span>
                </div>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs font-montserrat">View</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs text-red-500 font-montserrat">
                  BLOCKED
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div className="flex flex-col justify-start">
      <StatSkeleton />
      <TableSkeleton />
    </div>
  )
}
