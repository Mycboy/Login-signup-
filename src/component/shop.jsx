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
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxokSRnrnzPh9G_QFY_CSnXeAZBslDm5p01ZGjmOok9w&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREwggMOqgOrgaLHTgEaQONYGFAjtI5KPD-GybiIiHH9IqYohGL6yqikiM&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPav4phNIvkBc0sm6IULM19RexcPhJRMB0tftu0N4se1eANLuosNpX2IFd&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaZoGUecT_C83shhjgB-bL4Y3V-430uCk0gkQUlZiq6A&s=10',
  'https://i.ebayimg.com/images/g/JHQAAOSwsaFmRA8o/s-l400.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQBoNgVV-VtaHD_vyymEV_IhkZRHMz8z0qo56WThAatUSsDHGLSwoAHz3&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOiNze63R0hptIxO3iQB2Y3u9JMhwYTP1hls7GickcfC_1U-32Dkzns4&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYR799Y6UZnD0Fdvmv4NC18xfgetz7pcaY9-QphiJ8fnFV2ptdfI2NF2Q&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz7bQx0DZDvT-62z3QtToI5o2QOLClOjbMUEiiTEfr8tcfO6d0wn46eLgR&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Grs7RjAQxcDDkqvq23N5HBPliTF3xqbvCXR3M-6066sq6FOQipYacM5q&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFXBSRr_UsDEBmn_KhaiiszVZZXKqGx3LO2_Kqt5pnQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSagrTDto4ABtE5i3EhqoefPlgztBjp8lLaKfOtW9Ns1mMNyp0_oCur8wU&s=10',
  'https://storage.googleapis.com/images.pricecharting.com/f6ffdaee4bc3ddaaf0fe9ae33edeb2e96c262e66fc3c6afcd3b90d61b6586270/1600.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLHPFz0HLbnTPfbZaFHyKZyvo9nrZGAC0CfWfBsJENp4S0JFwIPbRlg4&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdWzucZeLygN1UH3srUJCklNEeJC2BBaj69exYc702d00LDJz5Cyl49os&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ynRItCDj90NjkfZY1Xp5vvksIqnzkCBcCt2iuQwHoZpdh6fbHXaW-ww&s=10',
  'https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/EX10/EX10_EN_106.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvc9y4qPv5GY-t5aGyhl-ad80sQUw4xSPpEoSTb-0pnBhNOdbNXY_sP7E&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjHbk6SP1STJYXWL0t9zj1u5Yj3a1unh_VfIkkdCgAaumhhcjqvwhlEM&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NU1FsdYS0uXdXDOBRjwaE9hg9ayJKqI3oOvFOesqMOst7DiLpGv9uaIz&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFUlE8kr0gLjkQjCanBwth3cxmNOEX8_10pi9QtDITqEX7aD7s48udF-E&s=10',
  'https://i.pinimg.com/736x/8a/eb/89/8aeb89fb177bacca784d42cdfc63a37a.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThW-3XJ_R12GvrQnP9NePro18vnrJtqy4N1IqO3r6oKbyy53zrhaZqpeQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_5x3rQLT2nT755_AWkUI6Td_zZre7u7btbizCuKS-On2BPtaS_ceXkU&s=10',
  'https://snapjson.untapped.gg/pocketjson/art/cards/cPK_10_011180_00_MEGABURSYAMOex_RR.webp',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYc4wLaEw2Ie1tke1fqlNhA544l2-1btP9ZNwRgvAfhw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxi6M-ZdVWlfLY1JejK2wIYeVZo56hfSHWWKaZADSfl5ALDr5vu-Y2AuE&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwRQ7p_UO1GozYrXhXz-9rMrkqFhL-NXcu4wK2JU23n2pcKMUXtXvEpUl2&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHUhpWImctZ6x_ONPygl6KcQR5s-wSlc9Ve3pDTbe7KRXexxHj3BCwi3sl&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb0BU2H84lK0f5-n2CSZU9cjM1SXCsen3-tHFBeqfUR1faWoRAhhNt7oQ&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZDwMBx1xOD5KkckfTqkjPse1VY9m7YNzPYD_HIOScXonMSuFMdNdQqw&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDaAyo7bS2CpBdLxHl7rjSWPFpWA4kI2E0glsS5k9vWg&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5GYdzwbfYYQoQncpw7taGSqtTZi5GKGXk2R_HDUE6fGZ_c0KT4qpYfI8&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5CPdU77nnKn4Y55nv8NuEXskRh2Wq6MUWKzRiDIxJO55DACdzYHLvfo_q&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HkX-GMA79WBIv1uo3FvhRXHCVVUoOxSUzk4ij_c3qgP9KJT4E3SVl7w&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFlPQdr37wR5DEWR0EMLfo_aACEFjmXtrCyGWXkVpilLwC4iPU8c8kyOI&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-2wJ3n8mDCYsWJfABuiqIqBPCKMECsLH5xob0N9mwzD4aY1S3r3ET_4&s=10',
  'https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV04/SV04_EN_214.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmWVmPkAQ38XFHlQvJ85Bt19HMqVj5Olrmd6qTgoS_1dbE9v9f8SlszA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvO7_jLC6difh4pOrGuvRAQS3ViwR3vSeL38cQB6yPF2Ko4kiH8wi8kxh&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBxnC93C9brUGKdPDQLXwEo91dgqB3ny5TEI8AM--QDwqjgHEcxoUB_SLd&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTs_0GzTu-1S_TBwSHHsi6gZ97zJ0GfeUuXcyNrd3hg&s=10',
  'https://i.etsystatic.com/22089514/r/il/c358dd/4236615365/il_fullxfull.4236615365_ay24.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT14pQACumpQC8ERWFtP81l7HQdCQvPYszTveRPCvpO2g4mccCE85Wdfc&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDHmdL8XPZOHnfXb302DL0kVavYnFTtnjT3AHs6pmRh7ZObHEPQ6fPjP7&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpdkEk1Vyo4BjFoLeIuzmn4HfStQjOT4Ixwp_W9U-LXrX4o4aoDPFBlmAX&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktYs7OWy1nbVZQyQJCgodLKQ4TY1I3UE8FgObMbo0_Q&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWn9KQOOrjRDebBn05hNryYztNEwj8GTWWEgA-mMx5twUrWAfvV_0MI4Xk&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZS7iKdwINxAmKZhqXMD0S7L01vzGA-gLHWqW3-E_LeH29MfPFJsNaTN0&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLAlqEKHywek7VmBVjyiL_nFteu_vrQrAxNu9RDTBDoLLAapalIURD7Qx&s=10',
  'https://tcgplayer-cdn.tcgplayer.com/product/676096_in_1000x1000.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdnSPf4_YKdc-eAeIL3Bh00T1FH8kBsgYxcTVj8YmuwtoDcExko44gsca1&s=10',
  'https://tcgplayer-cdn.tcgplayer.com/product/111548_in_1000x1000.jpg',
  'https://i.ebayimg.com/images/g/4uwAAOSwIpFh35zs/s-l400.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMD_h_0EcTZdhOCe7PIlTtVhtNs8UCxnY2qH-ilzp53dYlPPufUzt3iOM&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWZJ46BYUSeZEGXtGe1dPqb38f5OWas1lmffvNTcDaXqwvFo93LD5_6o&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1GejdGA5K4E0JNImMnNhtMkSsxLkSdZzDh6vC1hIKYA&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCpu1Hv4EuOtKZLCEOWLtYzPR5mqkTSOHiM_ocsYe7jn3YJMzow0mz8g&s=10',
  'https://storage.googleapis.com/images.pricecharting.com/oe4oy4qfpwy2n5yo/1600.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDXvEcRvdQ6lHw0vDUbeiTWxpQZS5VI01T-KUEf9eLp_Q4tO22Do6dMiO6&s=10',
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
      { name: 'Sceptile EX', price: '$76', rarity: 'EX', stock: 8, image: baseImages[20], detail: 'Forest aura • Bold foil • High-turn collector pick' },
      { name: 'Rayquaza Delta', price: '$118', rarity: 'Rare', stock: 4, image: baseImages[21], detail: 'Delta form • Sky-grade finish • Legendary demand' },
      { name: 'Deoxys Prism', price: '$132', rarity: 'Prism', stock: 2, image: baseImages[22], detail: 'Alien rarity • Prism shimmer • Ultra-rare finish' },
      { name: 'Swampert V', price: '$72', rarity: 'V', stock: 9, image: baseImages[23], detail: 'Battle-heavy • Water type • Great for team decks' },
      { name: 'Blaziken Mega', price: '$142', rarity: 'Mega', stock: 3, image: baseImages[24], detail: 'Mega evolution • Fire energy • Premium collector card' },
      { name: 'Gardevoir EX', price: '$81', rarity: 'EX', stock: 7, image: baseImages[25], detail: 'Elegant foil • Collector favorite • High-value print' },
      { name: 'Absol Shadow', price: '$75', rarity: 'Shadow', stock: 8, image: baseImages[26], detail: 'Shadow treatment • Dark edge • Strong display value' },
      { name: 'Milotic Holo', price: '$69', rarity: 'Holo', stock: 10, image: baseImages[27], detail: 'Soft holo • Beautiful sheen • Easy collector entry' },
      { name: 'Aggron Reverse', price: '$80', rarity: 'Reverse', stock: 8, image: baseImages[28], detail: 'Rock-heavy • Reverse holo • Clean collector card' },
      { name: 'Metagross LVX', price: '$112', rarity: 'LVX', stock: 4, image: baseImages[29], detail: 'LVX finish • Premium line • Unique design details' }
    ]
  },
  sinnoh: {
    name: 'Sinnoh',
    description: 'Diamond-era icons and fan-favorite card legends from the Platinum run.',
    cards: [
      { name: 'Dialga GX', price: '$98', rarity: 'GX', stock: 5, image: baseImages[30], detail: 'Temporal aura • GX finish • Steel-mystic collector' },
      { name: 'Palkia VStar', price: '$89', rarity: 'VSTAR', stock: 6, image: baseImages[31], detail: 'VStar style • High-impact print • Great display piece' },
      { name: 'Lucario Platinum', price: '$114', rarity: 'Platinum', stock: 3, image: baseImages[32], detail: 'Platinum shine • Premium foil • Fan favorite art' },
      { name: 'Giratina LVX', price: '$80', rarity: 'LVX', stock: 7, image: baseImages[33], detail: 'LVX finish • Ghost energy • Distinctive quality' },
      { name: 'Manaphy EX', price: '$85', rarity: 'EX', stock: 7, image: baseImages[34], detail: 'Kindly aura • EX line • Strong palette contrast' },
      { name: 'Cresselia Holo', price: '$78', rarity: 'Holo', stock: 8, image: baseImages[35], detail: 'Holo effect • Mystic finish • Soft pastel glow' },
      { name: 'Darkrai Prism', price: '$96', rarity: 'Prism', stock: 5, image: baseImages[36], detail: 'Dark prism treatment • Rare light line • Collector choice' },
      { name: 'Porygon-Z V', price: '$66', rarity: 'V', stock: 10, image: baseImages[37], detail: 'Digital art • Budget-friendly • Liquid neon finish' },
      { name: 'Mismagius Reverse', price: '$74', rarity: 'Reverse', stock: 7, image: baseImages[38], detail: 'Reverse holo • Ghost flares • Rare set staple' },
      { name: 'Heatran Gold', price: '$124', rarity: 'Gold', stock: 4, image: baseImages[39], detail: 'Gold foil • Brutal edge • Premium finisher card' }
    ]
  },
  unova: {
    name: 'Unova',
    description: 'A modern collector lane with stylish sets and rare Black & White favorites.',
    cards: [
      { name: 'Reshiram B/W', price: '$82', rarity: 'Rare', stock: 8, image: baseImages[40], detail: 'Mythic artwork • Strong lineage • Premium finish' },
      { name: 'Zoroark NXD', price: '$70', rarity: 'NXD', stock: 9, image: baseImages[41], detail: 'NXD style • Clean design • Sharp contrast art' },
      { name: 'Kyurem Dragon', price: '$104', rarity: 'Collector', stock: 4, image: baseImages[42], detail: 'Dragon collector • Rare energy • Premium print' },
      { name: 'Victini V', price: '$69', rarity: 'V', stock: 10, image: baseImages[43], detail: 'Legendary mascot • Popular set pick • Affordable hype' },
      { name: 'Samurott EX', price: '$73', rarity: 'EX', stock: 9, image: baseImages[44], detail: 'Heavy armor look • Balanced rarity • Great value' },
      { name: 'Purrloin Gold', price: '$68', rarity: 'Gold', stock: 8, image: baseImages[45], detail: 'Gold foil • Cute collector price • Card market favorite' },
      { name: 'Talonflame Holo', price: '$80', rarity: 'Holo', stock: 7, image: baseImages[46], detail: 'Holo glow • Game-ready • Bright FF finish' },
      { name: 'Emboar V', price: '$92', rarity: 'V', stock: 6, image: baseImages[47], detail: 'Powerful V print • Strong collector momentum' },
      { name: 'Keldeo Prism', price: '$87', rarity: 'Prism', stock: 5, image:baseImages[48], detail: 'Prism finish • Rare sheen • Dynamic display value' },
      { name: 'Serperior Reverse', price: '$72', rarity: 'Reverse', stock: 10, image: baseImages[49], detail: 'Reverse holo • Elegant foliage art • Great starter card' }
    ]
  },
  kalos: {
    name: 'Kalos',
    description: 'Mega Evolutions, sleek designs, and high-pressure collector cards.',
    cards: [
      { name: 'Mega Gengar', price: '$130', rarity: 'Mega', stock: 3, image: baseImages[50], detail: 'Mega aura • High demand • Premium battle card' },
      { name: 'Sylveon EX', price: '$75', rarity: 'EX', stock: 8, image: baseImages[51], detail: 'Fairy theme • Elegant foil • Beloved collector card' },
      { name: 'Greninja Break', price: '$88', rarity: 'Break', stock: 5, image: baseImages[52], detail: 'Break style • High art value • Collector favorite' },
      { name: 'Mega Mewtwo', price: '$160', rarity: 'Mega', stock: 2, image: baseImages[53], detail: 'Elite rarity • Mega chaos • Top-tier display card' },
      { name: 'Diancie Prism', price: '$96', rarity: 'Prism', stock: 6, image: baseImages[54], detail: 'Prism sparkle • Crystal finish • Strong market trend' },
      { name: 'Aegislash V', price: '$78', rarity: 'V', stock: 8, image: baseImages[55], detail: 'Shield form • Sleek art • Collector-ready finish' },
      { name: 'Keldeo Rush', price: '$72', rarity: 'Rush', stock: 9, image: baseImages[56], detail: 'Rush style • Clean foil • Great modern value' },
      { name: 'Gyarados Mega', price: '$134', rarity: 'Mega', stock: 4, image: baseImages[57], detail: 'Mega scaling • Legendary energy • Display-grade card' },
      { name: 'Meowscarda Holo', price: '$70', rarity: 'Holo', stock: 10, image: baseImages[58], detail: 'Holo finish • Signature aura • Bright fan favorite' },
      { name: 'Fletchinder Gold', price: '$82', rarity: 'Gold', stock: 7, image: baseImages[59], detail: 'Gold trim • Premium finish • Great for display' }
    ]
  }
}

const Shop = ({
  seasonId = 'kanto',
  cards = [],
  onBack,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout,
  cartItems = [],
  cartCount = 0
}) => {
  const season = seasonCatalog[seasonId] || seasonCatalog.kanto
  const seasonCards = cards.length ? cards : (seasonCatalog[seasonId]?.cards || seasonCatalog.kanto.cards)

  const toInrAmount = (value) => {
    if (typeof value === 'number') return value
    const num = Number(String(value).replace(/[^\d.]/g, ''))
    if (Number.isNaN(num)) return 0
    return String(value).includes('₹') ? num : Math.round(num * 82)
  }

  const total = cartItems.reduce((sum, item) => {
    const value = toInrAmount(item.price)
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
          {seasonCards.map((card) => (
            <div key={card.id || `${card.season || season.name}-${card.name}`} className="shop-card">
              <img className="shop-card-image" src={card.image} alt={card.name} />
              <div className="shop-body">
                <div className="shop-tag">{card.rarity}</div>
                <h3>{card.name}</h3>
                <p className="card-detail">{card.detail}</p>
                <div className="shop-meta">
                  <span>{card.stock ?? 1} left</span>
                  <strong>{formatPrice(toInrAmount(card.price))}</strong>
                </div>
                <button className="buy-btn" onClick={() => onAddToCart({ ...card, id: card.id || `${card.name}-${card.rarity}` })}>Buy Now</button>
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
                      <span className="cart-price">{formatPrice(toInrAmount(item.price) * item.quantity)}</span>
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
