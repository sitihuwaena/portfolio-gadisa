import FeatureFooter from "@/features/FeatureFooter";
import FeatureNavbar from "@/features/FeatureNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <FeatureNavbar />
            <div className="min-h-screen overflow-y-auto">
                {children}
            </div>
            <FeatureFooter />
        </>
    )
}