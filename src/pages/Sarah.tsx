import StatusBar from '../components/whoop/StatusBar'
import TopNav from '../components/whoop/TopNav'
import BottomNav from '../components/whoop/BottomNav'
import SarahGoalSection from '../components/whoop/sarah/SarahGoalSection'
import SarahStatusSection from '../components/whoop/sarah/SarahStatusSection'
import SarahCoachSection from '../components/whoop/sarah/SarahCoachSection'
import SarahLogSection from '../components/whoop/sarah/SarahLogSection'

export default function Sarah() {
  return (
    <div className="h-screen bg-whoop-bg flex justify-center overflow-hidden">
      <div className="w-full max-w-[393px] h-screen bg-whoop-bg flex flex-col relative overflow-hidden">
        <StatusBar />
        <TopNav />
        <main className="flex-1 overflow-y-auto pb-16 pt-2">
          <SarahGoalSection />
          <SarahStatusSection />
          <SarahCoachSection />
          <SarahLogSection />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
