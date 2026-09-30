import { useId, type MouseEvent } from "react";
import { BrandIcon, type BrandIconName } from "./BrandIcon";
import "./BlogFooter.css";

type Props = {
  name: string;
  noticeTitle: string;
  linksLabel: string;
  newTabLabel: string;
  links: readonly { name: string; href: string; icon: BrandIconName }[];
  notice: readonly { term: string; value: string; href?: string }[];
  onHome: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function BlogFooter({ name, noticeTitle, linksLabel, newTabLabel, links, notice, onHome }: Props) {
  const noticeId = useId();

  return (
    <footer id="regulation" className="blog-footer" aria-label={name}>
      <div className="blog-footer-identity">
        <a className="blog-footer-brand" href="#hero" onClick={onHome}>
          <img className="blog-footer-mark" src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" />
          <span>{name}</span>
        </a>
        <nav className="blog-footer-social" aria-label={linksLabel}>
          {links.map(link => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
              aria-label={`${link.name} · ${newTabLabel}`}>
              <BrandIcon name={link.icon} className="blog-footer-social-icon" />
            </a>
          ))}
        </nav>
      </div>
      <section className="footer-notice" aria-labelledby={noticeId}>
        <div className="footer-notice-summary">
          <h2 id={noticeId}>{noticeTitle}</h2>
          <dl className="blog-footer-terms">
            {notice.slice(0, -1).map(item => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    aria-label={`${item.value} · ${newTabLabel}`}>{item.value}</a>
                ) : item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <dl className="blog-footer-terms footer-notice-important">
          {notice.slice(-1).map(item => (
            <div key={item.term}><dt>{item.term}</dt><dd>{item.value}</dd></div>
          ))}
        </dl>
      </section>
    </footer>
  );
}
