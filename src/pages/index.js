import React from "react"
import Layout from "../components/layout"
import ListContext from '../components/app/list/listContext'
import Seo from "../components/seo"

const IndexPage = () => {


  ////  PUSH NOTIFICATIONS (NEED SERVICE WORKER)
  // const EnableNotifications = async () => {

  //   // ////\\\\  TEST
  //   // let test1 = await navigator
  //   // console.log('__navigator:  ', test1)

  //   // let test2 = await navigator.serviceWorker
  //   // console.log('__navigator.serviceWorker:  ', test2)
  //   // ////\\\\


  //   let sw = await navigator.serviceWorker.ready
  //   let result = await sw.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: 'BEOqj6T1-hMdT4Qhvk_LuIPZFQIA3qj_pKEsdVgEQfEhHoF-P-5xa61OlTrwbXmB4sd8-kcsHAPhNrjEFrvjhIU',
  //   })
  //   console.log('___EnableNotifications result: ', result)
  // }


  return (
    <Layout>

      {/* <section className={`container`}>

        <button
          onClick={EnableNotifications}
        >
          Enable Notifications
        </button>

      </section> */}

      <ListContext />

    </Layout>
  )
}

export const Head = () => <Seo title="Digital VooDoo" description="React JS SPA with Wordpress as CMS" />

export default IndexPage