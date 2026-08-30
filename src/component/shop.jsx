import React from 'react'
import './shop.css'

const parsePrice = (value) => Number(String(value).replace(/[^\d.]/g, ''))
const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value))

const usdToInr = (amount) => Math.round(Number(amount) * 82)

const baseImages = [
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
]

export const seasonCatalog = {
  kanto: {
    name: 'Kanto',
    description: 'Classic starters, iconic legends, and the original Poké card era.',
    cards: [
      { name: 'Charizard Holo', price: '$189', rarity: 'Ultra Rare', stock: 4, image: baseImages[0], detail: 'Holo foil finish • 1st Edition style • Collector-grade' },
      { name: 'Blastoise PSA', price: '$145', rarity: 'Mint Grade', stock: 2, image: baseImages[1], detail: 'PSA slabbed • Near-perfect corners • Vault quality' },
      { name: 'Pikachu Illustrator', price: '$560', rarity: 'Museum Piece', stock: 1, image: baseImages[2], detail: 'One-of-one prestige card • Ultra rare art print' },
      { name: 'Venusaur EX', price: '$96', rarity: 'EX', stock: 5, image: baseImages[3], detail: 'Battle-ready • High demand • Premium holo pop' },
      { name: 'Squirtle Prism', price: '$68', rarity: 'Prism', stock: 8, image: baseImages[4], detail: 'Prism laser finish • Great for starter collectors' },
      { name: 'Bulbasaur Gold', price: '$74', rarity: 'Gold', stock: 7, image: baseImages[5], detail: 'Foil shine • Vintage gold treatment • Limited run' },
      { name: 'Lapras Reverse', price: '$82', rarity: 'Reverse', stock: 6, image: baseImages[6], detail: 'Reverse holo • Soft-tint art • Fan favorite pick' },
      { name: 'Articuno GX', price: '$120', rarity: 'GX', stock: 4, image: baseImages[7], detail: 'Legendary line • Battle card • Distinct GX aura' },
      { name: 'Mewtwo Shadow', price: '$142', rarity: 'Shadow', stock: 3, image: baseImages[8], detail: 'Shadow rarity • Dark-themed finish • Collectors item' },
      { name: 'Snorlax Jumbo', price: '$110', rarity: 'Jumbo', stock: 5, image: baseImages[9], detail: 'Oversized print • Rare jumbo frame • Display grade' }
    ]
  },
  johto: {
    name: 'Johto',
    description: 'Golden-era pulls with bold holo finishes and legendary chases.',
    cards: [
      { name: 'Machamp Reverse', price: '$94', rarity: 'Holo Reverse', stock: 7, image: baseImages[10], detail: 'Reverse holo • Classic Johto energy • High appeal' },
      { name: 'Typhlosion 1st Ed', price: '$120', rarity: 'Collector', stock: 3, image: baseImages[11], detail: '1st Edition edge • Premium collector • Vintage look' },
      { name: 'Gyarados Gold Star', price: '$210', rarity: 'Gold Star', stock: 2, image: baseImages[12], detail: 'Gold star chase • Legendary water card • Mint pull' },
      { name: 'Feraligatr V', price: '$88', rarity: 'V', stock: 6, image: baseImages[13], detail: 'Modern finish • Game-ready • Strong collector value' },
      { name: 'Ampharos Holo', price: '$71', rarity: 'Holo', stock: 9, image: baseImages[14], detail: 'Bright holo • Stable market • Popular set pick' },
      { name: 'Raikou Prism', price: '$94', rarity: 'Prism', stock: 5, image: baseImages[15], detail: 'Prism sparkle • Rare finish • Excellent display card' },
      { name: 'Meganium EX', price: '$79', rarity: 'EX', stock: 8, image: baseImages[16], detail: 'Leaf-themed • Exquisite print • High collector demand' },
      { name: 'Heracross V', price: '$76', rarity: 'V', stock: 7, image: baseImages[17], detail: 'High-contrast artwork • Fresh stock • Set staple' },
      { name: 'Kingdra Reverse', price: '$85', rarity: 'Reverse', stock: 6, image: baseImages[18], detail: 'Reverse holo • Dragon collector • Dark sea aesthetic' },
      { name: 'Entei Gold', price: '$128', rarity: 'Gold', stock: 3, image: baseImages[19], detail: 'Gold foil • Legendary chase • Premium finish' }
    ]
  },
  hoenn: {
    name: 'Hoenn',
    description: 'Ruby and Sapphire favorites with dynamic battle power and style.',
    cards: [
      { name: 'Sceptile EX', price: '$76', rarity: 'EX', stock: 8, image: baseImages[0], detail: 'Forest aura • Bold foil • High-turn collector pick' },
      { name: 'Rayquaza Delta', price: '$118', rarity: 'Rare', stock: 4, image: baseImages[1], detail: 'Delta form • Sky-grade finish • Legendary demand' },
      { name: 'Deoxys Prism', price: '$132', rarity: 'Prism', stock: 2, image: baseImages[2], detail: 'Alien rarity • Prism shimmer • Ultra-rare finish' },
      { name: 'Swampert V', price: '$72', rarity: 'V', stock: 9, image: baseImages[3], detail: 'Battle-heavy • Water type • Great for team decks' },
      { name: 'Blaziken Mega', price: '$142', rarity: 'Mega', stock: 3, image: baseImages[4], detail: 'Mega evolution • Fire energy • Premium collector card' },
      { name: 'Gardevoir EX', price: '$81', rarity: 'EX', stock: 7, image: baseImages[5], detail: 'Elegant foil • Collector favorite • High-value print' },
      { name: 'Absol Shadow', price: '$75', rarity: 'Shadow', stock: 8, image: baseImages[6], detail: 'Shadow treatment • Dark edge • Strong display value' },
      { name: 'Milotic Holo', price: '$69', rarity: 'Holo', stock: 10, image: baseImages[7], detail: 'Soft holo • Beautiful sheen • Easy collector entry' },
      { name: 'Aggron Reverse', price: '$80', rarity: 'Reverse', stock: 8, image: baseImages[8], detail: 'Rock-heavy • Reverse holo • Clean collector card' },
      { name: 'Metagross LVX', price: '$112', rarity: 'LVX', stock: 4, image: baseImages[9], detail: 'LVX finish • Premium line • Unique design details' }
    ]
  },
  sinnoh: {
    name: 'Sinnoh',
    description: 'Diamond-era icons and fan-favorite card legends from the Platinum run.',
    cards: [
      { name: 'Dialga GX', price: '$98', rarity: 'GX', stock: 5, image: baseImages[10], detail: 'Temporal aura • GX finish • Steel-mystic collector' },
      { name: 'Palkia VStar', price: '$89', rarity: 'VSTAR', stock: 6, image: baseImages[11], detail: 'VStar style • High-impact print • Great display piece' },
      { name: 'Lucario Platinum', price: '$114', rarity: 'Platinum', stock: 3, image: baseImages[12], detail: 'Platinum shine • Premium foil • Fan favorite art' },
      { name: 'Giratina LVX', price: '$80', rarity: 'LVX', stock: 7, image: baseImages[13], detail: 'LVX finish • Ghost energy • Distinctive quality' },
      { name: 'Manaphy EX', price: '$85', rarity: 'EX', stock: 7, image: baseImages[14], detail: 'Kindly aura • EX line • Strong palette contrast' },
      { name: 'Cresselia Holo', price: '$78', rarity: 'Holo', stock: 8, image: baseImages[15], detail: 'Holo effect • Mystic finish • Soft pastel glow' },
      { name: 'Darkrai Prism', price: '$96', rarity: 'Prism', stock: 5, image: baseImages[16], detail: 'Dark prism treatment • Rare light line • Collector choice' },
      { name: 'Porygon-Z V', price: '$66', rarity: 'V', stock: 10, image: baseImages[17], detail: 'Digital art • Budget-friendly • Liquid neon finish' },
      { name: 'Mismagius Reverse', price: '$74', rarity: 'Reverse', stock: 7, image: baseImages[18], detail: 'Reverse holo • Ghost flares • Rare set staple' },
      { name: 'Heatran Gold', price: '$124', rarity: 'Gold', stock: 4, image: baseImages[19], detail: 'Gold foil • Brutal edge • Premium finisher card' }
    ]
  },
  unova: {
    name: 'Unova',
    description: 'A modern collector lane with stylish sets and rare Black & White favorites.',
    cards: [
      { name: 'Reshiram B/W', price: '$82', rarity: 'Rare', stock: 8, image: baseImages[0], detail: 'Mythic artwork • Strong lineage • Premium finish' },
      { name: 'Zoroark NXD', price: '$70', rarity: 'NXD', stock: 9, image: baseImages[1], detail: 'NXD style • Clean design • Sharp contrast art' },
      { name: 'Kyurem Dragon', price: '$104', rarity: 'Collector', stock: 4, image: baseImages[2], detail: 'Dragon collector • Rare energy • Premium print' },
      { name: 'Victini V', price: '$69', rarity: 'V', stock: 10, image: baseImages[3], detail: 'Legendary mascot • Popular set pick • Affordable hype' },
      { name: 'Samurott EX', price: '$73', rarity: 'EX', stock: 9, image: baseImages[4], detail: 'Heavy armor look • Balanced rarity • Great value' },
      { name: 'Purrloin Gold', price: '$68', rarity: 'Gold', stock: 8, image: baseImages[5], detail: 'Gold foil • Cute collector price • Card market favorite' },
      { name: 'Talonflame Holo', price: '$80', rarity: 'Holo', stock: 7, image: baseImages[6], detail: 'Holo glow • Game-ready • Bright FF finish' },
      { name: 'Emboar V', price: '$92', rarity: 'V', stock: 6, image: baseImages[7], detail: 'Powerful V print • Strong collector momentum' },
      { name: 'Keldeo Prism', price: '$87', rarity: 'Prism', stock: 5, image: baseImages[8], detail: 'Prism finish • Rare sheen • Dynamic display value' },
      { name: 'Serperior Reverse', price: '$72', rarity: 'Reverse', stock: 10, image: baseImages[9], detail: 'Reverse holo • Elegant foliage art • Great starter card' }
    ]
  },
  kalos: {
    name: 'Kalos',
    description: 'Mega Evolutions, sleek designs, and high-pressure collector cards.',
    cards: [
      { name: 'Mega Gengar', price: '$130', rarity: 'Mega', stock: 3, image: baseImages[10], detail: 'Mega aura • High demand • Premium battle card' },
      { name: 'Sylveon EX', price: '$75', rarity: 'EX', stock: 8, image: baseImages[11], detail: 'Fairy theme • Elegant foil • Beloved collector card' },
      { name: 'Greninja Break', price: '$88', rarity: 'Break', stock: 5, image: baseImages[12], detail: 'Break style • High art value • Collector favorite' },
      { name: 'Mega Mewtwo', price: '$160', rarity: 'Mega', stock: 2, image: baseImages[13], detail: 'Elite rarity • Mega chaos • Top-tier display card' },
      { name: 'Diancie Prism', price: '$96', rarity: 'Prism', stock: 6, image: baseImages[14], detail: 'Prism sparkle • Crystal finish • Strong market trend' },
      { name: 'Aegislash V', price: '$78', rarity: 'V', stock: 8, image: baseImages[15], detail: 'Shield form • Sleek art • Collector-ready finish' },
      { name: 'Keldeo Rush', price: '$72', rarity: 'Rush', stock: 9, image: baseImages[16], detail: 'Rush style • Clean foil • Great modern value' },
      { name: 'Gyarados Mega', price: '$134', rarity: 'Mega', stock: 4, image: baseImages[17], detail: 'Mega scaling • Legendary energy • Display-grade card' },
      { name: 'Meowscarda Holo', price: '$70', rarity: 'Holo', stock: 10, image: baseImages[18], detail: 'Holo finish • Signature aura • Bright fan favorite' },
      { name: 'Fletchinder Gold', price: '$82', rarity: 'Gold', stock: 7, image: baseImages[19], detail: 'Gold trim • Premium finish • Great for display' }
    ]
  }
}

const Shop = ({
  seasonId = 'kanto',
  onBack,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout,
  cartItems = [],
  cartCount = 0
}) => {
  const season = seasonCatalog[seasonId] || seasonCatalog.kanto

  const total = cartItems.reduce((sum, item) => {
    const value = usdToInr(parsePrice(item.price))
    return sum + value * item.quantity
  }, 0)

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div>
          <div className="shop-kicker">PokéVault</div>
          <h1>{season.name} Collection</h1>
        </div>
        <div className="shop-actions">
          <button className="shop-btn secondary" onClick={onBack}>Back to seasons</button>
          <button className="shop-btn primary" onClick={onCheckout}>Cart ({cartCount})</button>
        </div>
      </div>

      <p className="shop-description">{season.description}</p>

      <div className="shop-layout">
        <div className="shop-grid">
          {season.cards.map((card) => (
            <div key={card.name} className="shop-card">
              <img className="shop-card-image" src={card.image} alt={card.name} />
              <div className="shop-body">
                <div className="shop-tag">{card.rarity}</div>
                <h3>{card.name}</h3>
                <p className="card-detail">{card.detail}</p>
                <div className="shop-meta">
                  <span>{card.stock} left</span>
                  <strong>{formatPrice(usdToInr(parsePrice(card.price)))}</strong>
                </div>
                <button className="buy-btn" onClick={() => onAddToCart(card)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-panel">
          <div className="cart-header">
            <h3>Cart Summary</h3>
            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.rarity}</span>
                    </div>
                    <div className="cart-actions">
                      <div className="quantity-control small">
                        <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                      </div>
                      <span className="cart-price">{formatPrice(usdToInr(parsePrice(item.price)) * item.quantity)}</span>
                      <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}

export default Shop
