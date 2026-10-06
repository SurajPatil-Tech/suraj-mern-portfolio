import { ArrowRight } from 'lucide-react'

export default function ThankYou() {
 return <section className="page-section thankyou"><div className="thank-visual"><img src="/assets/developer-seated.png" alt="Boy developer sitting with laptop"/></div><div className="thank-copy"><span className="eyebrow"><i/>Thanks for visiting</span><h2>Let’s Build<br/>Something <span>Great</span></h2><p>Feel free to connect with me anytime.</p><a className="btn primary" href="#home">Back to Home <ArrowRight size={15}/></a></div></section>
}
