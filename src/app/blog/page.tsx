import LogAnalytics from "@/components/analytics/log"

export default function BlogPage() {
    return (
        <div>
            <LogAnalytics eventName="page_view" eventParams={{ page: "about" }} />
            <h1>About Me</h1>
            <p>
                I am a passionate developer with experience in building web applications and digital platforms.
            </p>
        </div>
    );
}
