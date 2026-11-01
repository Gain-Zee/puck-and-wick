/**
 * Puck & Wick — Drop 01 VIP Waitlist Modal & Lead Capture
 * Allows visitors to join the priority launch list for unreleased Lauson-98™
 * Odor Pucks, Sanctuary Body/Linen Care, and the $98 Collector Gift Boxes.
 */

export const HARDWARE_WAITLIST_MODE = true;

export function saveWaitlistLead(itemName, contactValue) {
  try {
    const existing = JSON.parse(localStorage.getItem('puck_wick_vip_waitlist') || '[]');
    existing.push({
      item: itemName,
      contact: contactValue,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('puck_wick_vip_waitlist', JSON.stringify(existing));
  } catch (_) {}
}

export function openWaitlistModal(productName = 'ZeoCarb-98™ Drop 01 Hardware', priceLabel = '$48.00') {
  const existingModal = document.getElementById('pw-waitlist-modal-backdrop');
  if (existingModal) existingModal.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'pw-waitlist-modal-backdrop';
  backdrop.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(6,7,10,0.86);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem;';

  backdrop.innerHTML = `
    <div role="dialog" aria-modal="true" aria-labelledby="pw-waitlist-title" style="width:100%;max-width:440px;background:linear-gradient(165deg,#141720 0%,#0B0D12 100%);border:1px solid rgba(212,175,55,0.55);border-radius:14px;padding:1.6rem 1.4rem;box-shadow:0 24px 60px rgba(0,0,0,0.9);color:#FAF5E8;position:relative;font-family:'Inter',-apple-system,sans-serif;">
      <button type="button" id="pw-waitlist-close" aria-label="Close waitlist modal" style="position:absolute;top:0.85rem;right:0.85rem;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#FAF5E8;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">✕</button>
      <div style="display:inline-block;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#E5C878;background:rgba(212,175,55,0.14);border:1px solid rgba(212,175,55,0.45);padding:0.24rem 0.65rem;border-radius:999px;margin-bottom:0.75rem;">
        Coming Soon • Batch 01 VIP Waitlist
      </div>
      <h3 id="pw-waitlist-title" style="font-family:'Cormorant Garamond','Cinzel',serif;font-size:1.55rem;font-weight:700;color:#FFFFFF;margin:0 0 0.35rem 0;line-height:1.2;">
        Reserve Early Access: ${productName}
      </h3>
      <p style="font-size:0.84rem;color:#B0B5C0;line-height:1.5;margin:0 0 1.1rem 0;">
        Our <strong>100% American Soy Candles ($44) are in stock now</strong>, while our first small-batch production run of <strong>${productName} (${priceLabel})</strong> is currently being finished in Loudoun County, VA. Enter your email or phone number below for priority Batch 01 access.
      </p>
      <form id="pw-waitlist-form" style="display:flex;flex-direction:column;gap:0.65rem;">
        <input type="text" id="pw-waitlist-contact" required placeholder="Your Email Address or Mobile Number..." style="width:100%;height:44px;padding:0 0.9rem;border-radius:8px;background:#08090C;border:1px solid rgba(197,160,89,0.45);color:#FFFFFF;font-size:0.88rem;outline:none;box-sizing:border-box;" />
        <button type="submit" class="btn btn-gold" style="width:100%;min-height:44px;font-size:0.8rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border-radius:8px;cursor:pointer;">
          Notify Me First When Batch 01 Drops
        </button>
      </form>
      <div id="pw-waitlist-success" style="display:none;margin-top:0.75rem;padding:0.75rem;border-radius:8px;background:rgba(59,122,87,0.22);border:1px solid #3B7A57;color:#A7F3D0;font-size:0.82rem;line-height:1.45;text-align:center;">
        ✓ <strong>You’re on the Batch 01 VIP List!</strong> We’ll notify you the moment ${productName} is ready to ship.
      </div>
      <div style="margin-top:0.9rem;padding-top:0.75rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;font-size:0.75rem;color:#8E93A0;">
        <span>Want candles today?</span>
        <button type="button" id="pw-waitlist-shop-candles" style="background:none;border:none;color:#E5C878;font-weight:700;cursor:pointer;text-decoration:underline;font-size:0.75rem;">Shop In-Stock Soy Candles ($44) →</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  const close = () => backdrop.remove();
  backdrop.querySelector('#pw-waitlist-close').addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  backdrop.querySelector('#pw-waitlist-shop-candles').addEventListener('click', () => {
    close();
    const candleTab = document.querySelector('[data-filter="candles"]');
    if (candleTab) candleTab.click();
    const shopEl = document.getElementById('shop');
    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
  });

  const form = backdrop.querySelector('#pw-waitlist-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = backdrop.querySelector('#pw-waitlist-contact').value.trim();
    if (!val) return;
    saveWaitlistLead(productName, val);
    form.style.display = 'none';
    backdrop.querySelector('#pw-waitlist-success').style.display = 'block';
  });
}
