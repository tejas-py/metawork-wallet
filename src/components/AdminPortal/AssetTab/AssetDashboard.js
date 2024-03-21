import React from 'react'
import ApexCharts from 'apexcharts'

export default function AssetDashboard() {
  function UserAssetTable() {
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="font-montserrat">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Total Invested</th>
              <th>Current Invested</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>
                <div>
                  <div className="font-bold">Tejas</div>
                  <div className="text-sm opacity-50 font-montserrat">
                    {'34XRFBWVM2HGSVOVNKLCYJBLWUUY3YJ2PCIHKAF4E7AXFBYGJR65H5XD6E'.slice(0, 8) +
                      '...'}
                  </div>
                </div>
              </td>
              <td>$1200</td>
              <td>$600</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  function StatModal({ id, tiitle }) {
    return (
      <dialog id={id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">{tiitle}</h3>
          <p className="py-4">
            <UserAssetTable />
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }

  function Stats() {
    return (
      <div className="stats stats-horizontal shadow-lg bg-white font-montserrat">
        <div className="stat place-items-center">
          <div className="stat-title">Assets</div>
          <div className="stat-value">2</div>
          <div className="stat-desc">Genopets | Hunter</div>
        </div>

        <div
          className="stat place-items-center hover:cursor-pointer"
          onClick={() => document.getElementById('genopets').showModal()}
        >
          <div className="stat-title">Genopets</div>
          <StatModal id={'genopets'} tiitle={'Genopets Investors'} />
          <div className="stat-value text-secondary">$1,200</div>
          <div className="stat-desc text-red-600">↘︎ 90 (14%)</div>
        </div>

        <div
          className="stat place-items-center hover:cursor-pointer"
          onClick={() => document.getElementById('hunter').showModal()}
        >
          <div className="stat-title">Hunter</div>
          <StatModal id={'hunter'} tiitle={'Hunter Investors'} />
          <div className="stat-value text-secondary">$1,200</div>
          <div className="stat-desc text-red-600">↘︎ 90 (14%)</div>
        </div>
      </div>
    )
  }

  function AreaGraph() {
    const options = {
      chart: {
        height: 500,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          name: 'Genopets',
          data: [45, 52, 38, 45, 19, 23, 2],
        },
        {
          name: 'Hunters',
          data: [20, 40, 50, 45, 21, 30, 0],
        },
      ],
      fill: {
        type: 'gradient',
        colors: ['#00A6FF', '#E91E63'],
        markers: {
          colors: ['#00A6FF', '#E91E63'],
        },
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.8,
          opacityTo: 1,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan'],
      },
    }

    const chart = new ApexCharts(document.querySelector('#chart'), options)
    chart.render()
  }

  function Skeleton() {
    return <div className="skeleton w-32 h-32"></div>
  }

  return (
    <div className="flex flex-col justify-center">
      <Stats />
      <div id="chart" style={{ width: '90vw', margin: '35px auto', stacked: true }}>
        <AreaGraph />
      </div>
    </div>
  )
}
