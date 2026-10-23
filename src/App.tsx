import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Heart,
  Menu,
  X,
  Send,
  Clock3,
  Flower2,
  ArrowDown,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { wedding } from "./config/wedding";
import heroArt from "./assets/illustrations/hero-couple.jpg";

const dateLabel = new Intl.DateTimeFormat("vi-VN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Ho_Chi_Minh",
}).format(new Date(`${wedding.date}T12:00:00+07:00`));
const dateShort = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Asia/Ho_Chi_Minh",
}).format(new Date(`${wedding.date}T12:00:00+07:00`));

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [attendance, setAttendance] = useState("yes");
  const target = useMemo(() => {
    const time = wedding.time || "15:00";
    return new Date(`${wedding.date}T${time}:00+07:00`).getTime();
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = Math.max(0, target - now);
  const passed = now >= target;
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const goTo = () => {
    document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("form-name", "wedding-rsvp");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          data as unknown as URLSearchParams,
        ).toString(),
      });
      if (!response.ok)
        throw new Error(
          "Không gửi được xác nhận. Vui lòng thử lại hoặc liên hệ trực tiếp với gia đình.",
        );
      setSubmitted(true);
      form.reset();
      setAttendance("yes");
    } catch {
      setError(
        "Chưa gửi được xác nhận. Hãy kiểm tra kết nối hoặc thử lại sau khi website được triển khai trên Netlify.",
      );
    } finally {
      setSending(false);
    }
  }

  const familyValue = (value: string) =>
    value.trim() || "Thông tin sẽ được cập nhật";

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="seal" href="#home" aria-label="Về đầu trang">
          囍
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Điều hướng chính"
        >
          {[
            ["Trang chủ", "#home"],
            ["Thông tin lễ cưới", "#details"],
            ["Lịch trình", "#schedule"],
            ["Địa điểm", "#venue"],
            ["RSVP", "#rsvp"],
            ["Liên hệ", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-ornament ornament-left">✿</div>
          <div className="hero-ornament ornament-right">✿</div>
          <div className="hero-copy">
            <p className="eyebrow">TRÂN TRỌNG KÍNH MỜI</p>
            <p className="event-title">{wedding.eventTitle}</p>
            <h1>
              <span>{wedding.bride}</span>
              <i>&</i>
              <span>{wedding.groom}</span>
            </h1>
            <div className="gold-rule">
              <span>囍</span>
            </div>
            <p className="date-large">{dateShort}</p>
            <p className="date-long">{dateLabel}</p>
            <p className="hero-message">{wedding.welcomeMessage}</p>
            <button className="primary-button" onClick={goTo}>
              Xem lời mời <ArrowDown size={16} />
            </button>
          </div>
          <div className="hero-art-wrap">
            <img
              src={heroArt}
              className="hero-art"
              alt="Minh họa cô dâu áo dài đỏ và chú rể áo dài xanh trong khung cảnh kiến trúc Việt Nam truyền thống"
            />
          </div>
          <div className="hero-bottom">
            <span>❧</span> MỘT NGÀY VUI — MỘT ĐỜI THƯƠNG <span>❧</span>
          </div>
        </section>

        <section className="countdown section">
          <p className="eyebrow">NGÀY HẸN ĐANG ĐẾN GẦN</p>
          <h2>
            {passed
              ? "Ngày vui đã đến — cảm ơn bạn đã đồng hành!"
              : "Đếm ngược ngày chung đôi"}
          </h2>
          {!passed && (
            <div className="count-grid">
              {[
                [days, "Ngày"],
                [hours, "Giờ"],
                [minutes, "Phút"],
                [seconds, "Giây"],
              ].map(([n, label]) => (
                <div className="count-item" key={String(label)}>
                  <strong>{String(n).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
          {!wedding.time && !passed && (
            <p className="fine-print">
              * Đồng hồ đang tính đến 15:00 ngày cưới theo giờ Việt Nam; thời
              gian này chỉ là mốc tạm tính cho đến khi giờ lễ được xác nhận.
            </p>
          )}
        </section>

        <section className="story section" id="story">
          <div className="story-art">
            <div className="round-frame">
              <img
                src={heroArt}
                alt="Minh họa đôi uyên ương trong trang phục truyền thống"
              />
            </div>
            <span className="side-stamp">囍</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">LỜI THƯƠNG GỬI BẠN</p>
            <h2>
              {wedding.story.enabled
                ? wedding.story.heading
                : "Cùng nhau viết tiếp chuyện tình"}
            </h2>
            <div className="small-rule">❧</div>
            <p>
              {wedding.story.enabled && wedding.story.introduction
                ? wedding.story.introduction
                : "Từ những điều giản dị nhất, chúng mình đã tìm thấy nhau. Và hôm nay, chúng mình mong được cùng gia đình, bạn bè chia sẻ một dấu mốc thật ý nghĩa trên hành trình phía trước."}
            </p>
            {wedding.story.enabled && wedding.story.milestones.length > 0 && (
              <div className="milestones">
                {wedding.story.milestones.map((item) => (
                  <article key={item.title}>
                    <small>{item.date}</small>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="details section" id="details">
          <div className="section-heading">
            <p className="eyebrow">TRÂN TRỌNG KÍNH MỜI</p>
            <h2>Thông tin lễ đính hôn</h2>
            <div className="small-rule">✦</div>
          </div>
          <div className="details-grid">
            <article className="info-card family-card">
              <span className="card-icon">❀</span>
              <h3>Gia đình nhà gái</h3>
              <p>
                <b>Cha:</b> {familyValue(wedding.family.bride.father)}
              </p>
              <p>
                <b>Mẹ:</b> {familyValue(wedding.family.bride.mother)}
              </p>
              <p>
                <b>Địa chỉ:</b> {familyValue(wedding.family.bride.address)}
              </p>
            </article>
            <div className="double-happiness">囍</div>
            <article className="info-card family-card">
              <span className="card-icon">❀</span>
              <h3>Gia đình nhà trai</h3>
              <p>
                <b>Cha:</b> {familyValue(wedding.family.groom.father)}
              </p>
              <p>
                <b>Mẹ:</b> {familyValue(wedding.family.groom.mother)}
              </p>
              <p>
                <b>Địa chỉ:</b> {familyValue(wedding.family.groom.address)}
              </p>
            </article>
          </div>
          <div className="event-strip">
            <div className="event-icon">
              <CalendarDays size={22} />
            </div>
            <div>
              <span>Ngày tổ chức</span>
              <strong>{dateLabel}</strong>
              <small>{dateShort} · Giờ Việt Nam</small>
            </div>
            <div className="event-icon">
              <Clock3 size={22} />
            </div>
            <div>
              <span>Thời gian</span>
              <strong>{wedding.time ? wedding.time : "09:15 AM"}</strong>
              <small>{wedding.eventTitle}</small>
            </div>
          </div>
        </section>

        <section className="schedule section" id="schedule">
          <div className="section-heading">
            <p className="eyebrow">CÙNG NHAU LƯU GIỮ KHOẢNH KHẮC</p>
            <h2>Lịch trình ngày vui</h2>
          </div>
          <div className="timeline">
            {wedding.schedule
              .filter((item) => item.time || item.description)
              .map((item, index) => (
                <article
                  className="timeline-item"
                  key={`${item.title}-${index}`}
                >
                  <div className="timeline-mark">{index + 1}</div>
                  <div>
                    <span className="time-label">
                      {item.time || "Thời gian cập nhật sau"}
                    </span>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                    {item.venue && <small>{item.venue}</small>}
                  </div>
                </article>
              ))}
            {wedding.schedule.every(
              (item) => !item.time && !item.description,
            ) && (
              <p className="placeholder-note">
                Lịch trình chi tiết sẽ được gia đình cập nhật sớm. Hẹn gặp bạn
                trong ngày vui!
              </p>
            )}
          </div>
        </section>

        <section className="venue section" id="venue">
          <div className="venue-copy">
            <p className="eyebrow">HẸN GẶP BẠN TẠI</p>
            <h2>Địa điểm tổ chức</h2>
            <h3>{wedding.venue.name}</h3>
            <p>
              {wedding.venue.address || "Địa chỉ cụ thể sẽ được cập nhật sau."}
            </p>
            {wedding.venue.note && <p>{wedding.venue.note}</p>}
            {wedding.venue.mapUrl && (
              <a
                className="primary-button link-button"
                href={wedding.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                Chỉ đường <ExternalLink size={16} />
              </a>
            )}
          </div>
          <div className="venue-art">
            <img
              src="/venue.png"
              alt="Địa điểm tổ chức lễ cưới"
              className="venue-photo"
            />
          </div>
        </section>

        <section className="rsvp section" id="rsvp">
          <div className="section-heading">
            <p className="eyebrow">SỰ HIỆN DIỆN CỦA BẠN LÀ NIỀM VUI</p>
            <h2>{wedding.rsvp.heading}</h2>
            <p>{wedding.rsvp.description}</p>
            <small>
              Vui lòng phản hồi trước ngày{" "}
              {new Intl.DateTimeFormat("vi-VN").format(
                new Date(`${wedding.rsvp.deadline}T12:00:00+07:00`),
              )}
              .
            </small>
          </div>
          {submitted ? (
            <div className="success-panel">
              <CheckCircle2 size={38} />
              <h3>Cảm ơn bạn thật nhiều!</h3>
              <p>Xác nhận của bạn đã được gửi. Hẹn gặp bạn trong ngày vui.</p>
              <button
                className="secondary-button"
                onClick={() => setSubmitted(false)}
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            <form
              className="rsvp-form"
              name="wedding-rsvp"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="wedding-rsvp" />
              <p className="honeypot">
                <label>
                  Để trống ô này{" "}
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <label>
                Họ và tên <em>*</em>
                <input
                  name="guest-name"
                  required
                  maxLength={100}
                  placeholder="Tên của bạn"
                />
              </label>
              <label>
                Bạn sẽ tham dự chứ? <em>*</em>
                <select
                  name="attendance"
                  required
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                >
                  <option value="yes">Mình sẽ tham dự</option>
                  <option value="no">Rất tiếc, mình không thể tham dự</option>
                  <option value="maybe">Mình cần xác nhận thêm</option>
                </select>
              </label>
              <label>
                Số lượng khách <em>*</em>
                <select name="guest-count" required defaultValue="1">
                  {Array.from({ length: wedding.rsvp.maxGuests }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} người
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Số điện thoại <span>(không bắt buộc)</span>
                <input
                  name="phone"
                  type="tel"
                  maxLength={25}
                  placeholder="09xx xxx xxx"
                />
              </label>
              <label>
                Yêu cầu ăn uống <span>(nếu có)</span>
                <input
                  name="dietary"
                  maxLength={250}
                  placeholder="Ví dụ: ăn chay"
                />
              </label>
              <label>
                Lời nhắn gửi đôi uyên ương <span>(không bắt buộc)</span>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1000}
                  placeholder="Gửi chúng mình đôi lời nhé..."
                />
              </label>
              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}
              <button
                className="primary-button submit-button"
                type="submit"
                disabled={sending}
              >
                {sending ? "Đang gửi…" : "Gửi xác nhận"} <Send size={16} />
              </button>
              <p className="privacy-note">
                Thông tin phản hồi chỉ được dùng để gia đình chuẩn bị cho ngày
                cưới và không hiển thị công khai.
              </p>
            </form>
          )}
        </section>

        <section className="contact section" id="contact">
          <Flower2 className="contact-flower" size={32} />
          <p className="eyebrow">THÂN THƯƠNG</p>
          <h2>Cảm ơn bạn đã đến bên chúng mình</h2>
          <p className="closing-message">{wedding.closingMessage}</p>
          <p className="signature">
            {wedding.bride} <span>&</span> {wedding.groom}
          </p>
          <div className="small-rule">囍</div>
          {wedding.contacts.length > 0 && (
            <div className="contact-list">
              {wedding.contacts.map((contact) => (
                <div key={contact.label}>
                  <strong>{contact.label}</strong>
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`}>
                      <Phone size={14} />
                      {contact.phone}
                    </a>
                  )}
                  {contact.email && (
                    <a href={`mailto:${contact.email}`}>
                      <Mail size={14} />
                      {contact.email}
                    </a>
                  )}
                  {contact.messageUrl && (
                    <a
                      href={contact.messageUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Nhắn tin <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          <Heart className="heart-icon" size={18} fill="currentColor" />
        </section>
      </main>
      <footer className="footer">
        <span>囍</span>
        <p>
          {wedding.bride} & {wedding.groom} · {dateShort}
        </p>
        <small>
          Được tạo bằng tình yêu, dành riêng cho ngày vui của chúng mình.
        </small>
      </footer>
    </div>
  );
}
export default App;
