const Product = require('./models/product')
const User = require('./models/user')

const defaultProducts = [
  {
    name: 'Charizard Holo',
    price: 15498,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Ultra Rare',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxokSRnrnzPh9G_QFY_CSnXeAZBslDm5p01ZGjmOok9w&s=10',
    stock: 4,
    description: 'Holo foil finish • 1st Edition style • Collector-grade'
  },
  {
    name: 'Blastoise PSA',
    price: 11890,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Mint Grade',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREwggMOqgOrgaLHTgEaQONYGFAjtI5KPD-GybiIiHH9IqYohGL6yqikiM&s=10',
    stock: 2,
    description: 'PSA slabbed • Near-perfect corners • Vault quality'
  },
  {
    name: 'Pikachu Illustrator',
    price: 45780,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Museum Piece',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPav4phNIvkBc0sm6IULM19RexcPhJRMB0tftu0N4se1eANLuosNpX2IFd&s=10',
    stock: 1,
    description: 'One-of-one prestige card • Ultra rare art print'
  },
  {
    name: 'Venusaur EX',
    price: 7850,
    category: 'kanto',
    season: 'kanto',
    rarity: 'EX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaZoGUecT_C83shhjgB-bL4Y3V-430uCk0gkQUlZiq6A&s=10',
    stock: 5,
    description: 'Battle-ready • High demand • Premium holo pop'
  },
  {
    name: 'Squirtle Prism',
    price: 5576,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Prism',
    image: 'https://i.ebayimg.com/images/g/JHQAAOSwsaFmRA8o/s-l400.jpg',
    stock: 8,
    description: 'Prism laser finish • Great for starter collectors'
  },
  {
    name: 'Bulbasaur Gold',
    price: 6068,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Gold',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQBoNgVV-VtaHD_vyymEV_IhkZRHMz8z0qo56WThAatUSsDHGLSwoAHz3&s=10',
    stock: 7,
    description: 'Foil shine • Vintage gold treatment • Limited run'
  },
  {
    name: 'Lapras Reverse',
    price: 6724,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Reverse',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOiNze63R0hptIxO3iQB2Y3u9JMhwYTP1hls7GickcfC_1U-32Dkzns4&s=10',
    stock: 6,
    description: 'Reverse holo • Soft-tint art • Fan favorite pick'
  },
  {
    name: 'Articuno GX',
    price: 9840,
    category: 'kanto',
    season: 'kanto',
    rarity: 'GX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYR799Y6UZnD0Fdvmv4NC18xfgetz7pcaY9-QphiJ8fnFV2ptdfI2NF2Q&s=10',
    stock: 4,
    description: 'Legendary line • Battle card • Distinct GX aura'
  },
  {
    name: 'Mewtwo Shadow',
    price: 11644,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Shadow',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz7bQx0DZDvT-62z3QtToI5o2QOLClOjbMUEiiTEfr8tcfO6d0wn46eLgR&s=10',
    stock: 3,
    description: 'Shadow rarity • Dark-themed finish • Collectors item'
  },
  {
    name: 'Snorlax Jumbo',
    price: 9020,
    category: 'kanto',
    season: 'kanto',
    rarity: 'Jumbo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Grs7RjAQxcDDkqvq23N5HBPliTF3xqbvCXR3M-6066sq6FOQipYacM5q&s=10',
    stock: 5,
    description: 'Oversized print • Rare jumbo frame • Display grade'
  },
  {
    name: 'Machamp Reverse',
    price: 7708,
    category: 'johto',
    season: 'johto',
    rarity: 'Holo Reverse',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFXBSRr_UsDEBmn_KhaiiszVZZXKqGx3LO2_Kqt5pnQ&s=10',
    stock: 7,
    description: 'Reverse holo • Classic Johto energy • High appeal'
  },
  {
    name: 'Typhlosion 1st Ed',
    price: 9840,
    category: 'johto',
    season: 'johto',
    rarity: 'Collector',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSagrTDto4ABtE5i3EhqoefPlgztBjp8lLaKfOtW9Ns1mMNyp0_oCur8wU&s=10',
    stock: 3,
    description: '1st Edition edge • Premium collector • Vintage look'
  },
  {
    name: 'Gyarados Gold Star',
    price: 17220,
    category: 'johto',
    season: 'johto',
    rarity: 'Gold Star',
    image: 'https://storage.googleapis.com/images.pricecharting.com/f6ffdaee4bc3ddaaf0fe9ae33edeb2e96c262e66fc3c6afcd3b90d61b6586270/1600.jpg',
    stock: 2,
    description: 'Gold star chase • Legendary water card • Mint pull'
  },
  {
    name: 'Feraligatr V',
    price: 7196,
    category: 'johto',
    season: 'johto',
    rarity: 'V',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLHPFz0HLbnTPfbZaFHyKZyvo9nrZGAC0CfWfBsJENp4S0JFwIPbRlg4&s=10',
    stock: 6,
    description: 'Modern finish • Game-ready • Strong collector value'
  },
  {
    name: 'Ampharos Holo',
    price: 5818,
    category: 'johto',
    season: 'johto',
    rarity: 'Holo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzdWzucZeLygN1UH3srUJCklNEeJC2BBaj69exYc702d00LDJz5Cyl49os&s=10',
    stock: 9,
    description: 'Bright holo • Stable market • Popular set pick'
  },
  {
    name: 'Raikou Prism',
    price: 7708,
    category: 'johto',
    season: 'johto',
    rarity: 'Prism',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ynRItCDj90NjkfZY1Xp5vvksIqnzkCBcCt2iuQwHoZpdh6fbHXaW-ww&s=10',
    stock: 5,
    description: 'Prism sparkle • Rare finish • Excellent display card'
  },
  {
    name: 'Meganium EX',
    price: 6478,
    category: 'johto',
    season: 'johto',
    rarity: 'EX',
    image: 'https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/EX10/EX10_EN_106.png',
    stock: 8,
    description: 'Leaf-themed • Exquisite print • High collector demand'
  },
  {
    name: 'Heracross V',
    price: 6232,
    category: 'johto',
    season: 'johto',
    rarity: 'V',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvc9y4qPv5GY-t5aGyhl-ad80sQUw4xSPpEoSTb-0pnBhNOdbNXY_sP7E&s=10',
    stock: 7,
    description: 'High-contrast artwork • Fresh stock • Set staple'
  },
  {
    name: 'Kingdra Reverse',
    price: 6970,
    category: 'johto',
    season: 'johto',
    rarity: 'Reverse',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjHbk6SP1STJYXWL0t9zj1u5Yj3a1unh_VfIkkdCgAaumhhcjqvwhlEM&s=10',
    stock: 6,
    description: 'Reverse holo • Dragon collector • Dark sea aesthetic'
  },
  {
    name: 'Entei Gold',
    price: 10496,
    category: 'johto',
    season: 'johto',
    rarity: 'Gold',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NU1FsdYS0uXdXDOBRjwaE9hg9ayJKqI3oOvFOesqMOst7DiLpGv9uaIz&s=10',
    stock: 3,
    description: 'Gold foil • Legendary chase • Premium finish'
  },
  {
    name: 'Sceptile EX',
    price: 6232,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'EX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFUlE8kr0gLjkQjCanBwth3cxmNOEX8_10pi9QtDITqEX7aD7s48udF-E&s=10',
    stock: 8,
    description: 'Forest aura • Bold foil • High-turn collector pick'
  },
  {
    name: 'Rayquaza Delta',
    price: 9676,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'Rare',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMD_h_0EcTZdhOCe7PIlTtVhtNs8UCxnY2qH-ilzp53dYlPPufUzt3iOM&s=10',
    stock: 4,
    description: 'Delta form • Sky-grade finish • Legendary demand'
  },
  {
    name: 'Deoxys Prism',
    price: 10824,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'Prism',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWZJ46BYUSeZEGXtGe1dPqb38f5OWas1lmffvNTcDaXqwvFo93LD5_6o&s=10',
    stock: 2,
    description: 'Alien rarity • Prism shimmer • Ultra-rare finish'
  },
  {
    name: 'Swampert V',
    price: 5904,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'V',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1GejdGA5K4E0JNImMnNhtMkSsxLkSdZzDh6vC1hIKYA&s=10',
    stock: 9,
    description: 'Battle-heavy • Water type • Great for team decks'
  },
  {
    name: 'Blaziken Mega',
    price: 11644,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'Mega',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCpu1Hv4EuOtKZLCEOWLtYzPR5mqkTSOHiM_ocsYe7jn3YJMzow0mz8g&s=10',
    stock: 3,
    description: 'Mega evolution • Fire energy • Premium collector card'
  },
  {
    name: 'Gardevoir EX',
    price: 6642,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'EX',
    image: 'https://storage.googleapis.com/images.pricecharting.com/oe4oy4qfpwy2n5yo/1600.jpg',
    stock: 7,
    description: 'Elegant foil • Collector favorite • High-value print'
  },
  {
    name: 'Absol Shadow',
    price: 6150,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'Shadow',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDXvEcRvdQ6lHw0vDUbeiTWxpQZS5VI01T-KUEf9eLp_Q4tO22Do6dMiO6&s=10',
    stock: 8,
    description: 'Shadow treatment • Dark edge • Strong display value'
  },
  {
    name: 'Milotic Holo',
    price: 5658,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'Holo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HkX-GMA79WBIv1uo3FvhRXHCVVUoOxSUzk4ij_c3qgP9KJT4E3SVl7w&s=10',
    stock: 10,
    description: 'Soft holo • Beautiful sheen • Easy collector entry'
  },
  {
    name: 'Aggron Reverse',
    price: 6560,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'Reverse',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFlPQdr37wR5DEWR0EMLfo_aACEFjmXtrCyGWXkVpilLwC4iPU8c8kyOI&s=10',
    stock: 8,
    description: 'Rock-heavy • Reverse holo • Clean collector card'
  },
  {
    name: 'Metagross LVX',
    price: 9184,
    category: 'hoenn',
    season: 'hoenn',
    rarity: 'LVX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-2wJ3n8mDCYsWJfABuiqIqBPCKMECsLH5xob0N9mwzD4aY1S3r3ET_4&s=10',
    stock: 4,
    description: 'LVX finish • Premium line • Unique design details'
  },
  {
    name: 'Dialga GX',
    price: 8036,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'GX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmWVmPkAQ38XFHlQvJ85Bt19HMqVj5Olrmd6qTgoS_1dbE9v9f8SlszA&s=10',
    stock: 5,
    description: 'Temporal aura • GX finish • Steel-mystic collector'
  },
  {
    name: 'Palkia VStar',
    price: 7298,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'VSTAR',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvO7_jLC6difh4pOrGuvRAQS3ViwR3vSeL38cQB6yPF2Ko4kiH8wi8kxh&s=10',
    stock: 6,
    description: 'VStar style • High-impact print • Great display piece'
  },
  {
    name: 'Lucario Platinum',
    price: 9348,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'Platinum',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBxnC93C9brUGKdPDQLXwEo91dgqB3ny5TEI8AM--QDwqjgHEcxoUB_SLd&s=10',
    stock: 3,
    description: 'Platinum shine • Premium foil • Fan favorite art'
  },
  {
    name: 'Giratina LVX',
    price: 6560,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'LVX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTs_0GzTu-1S_TBwSHHsi6gZ97zJ0GfeUuXcyNrd3hg&s=10',
    stock: 7,
    description: 'LVX finish • Ghost energy • Distinctive quality'
  },
  {
    name: 'Manaphy EX',
    price: 6970,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'EX',
    image: 'https://i.etsystatic.com/22089514/r/il/c358dd/4236615365/il_fullxfull.4236615365_ay24.jpg',
    stock: 7,
    description: 'Kindly aura • EX line • Strong palette contrast'
  },
  {
    name: 'Cresselia Holo',
    price: 6396,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'Holo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT14pQACumpQC8ERWFtP81l7HQdCQvPYszTveRPCvpO2g4mccCE85Wdfc&s=10',
    stock: 8,
    description: 'Holo effect • Mystic finish • Soft pastel glow'
  },
  {
    name: 'Darkrai Prism',
    price: 7872,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'Prism',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDHmdL8XPZOHnfXb302DL0kVavYnFTtnjT3AHs6pmRh7ZObHEPQ6fPjP7&s=10',
    stock: 5,
    description: 'Dark prism treatment • Rare light line • Collector choice'
  },
  {
    name: 'Porygon-Z V',
    price: 5412,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'V',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpdkEk1Vyo4BjFoLeIuzmn4HfStQjOT4Ixwp_W9U-LXrX4o4aoDPFBlmAX&s=10',
    stock: 10,
    description: 'Digital art • Budget-friendly • Liquid neon finish'
  },
  {
    name: 'Mismagius Reverse',
    price: 6068,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'Reverse',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktYs7OWy1nbVZQyQJCgodLKQ4TY1I3UE8FgObMbo0_Q&s',
    stock: 7,
    description: 'Reverse holo • Ghost flares • Rare set staple'
  },
  {
    name: 'Heatran Gold',
    price: 10168,
    category: 'sinnoh',
    season: 'sinnoh',
    rarity: 'Gold',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWn9KQOOrjRDebBn05hNryYztNEwj8GTWWEgA-mMx5twUrWAfvV_0MI4Xk&s=10',
    stock: 4,
    description: 'Gold foil • Brutal edge • Premium finisher card'
  },
  {
    name: 'Reshiram B/W',
    price: 6724,
    category: 'unova',
    season: 'unova',
    rarity: 'Rare',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZS7iKdwINxAmKZhqXMD0S7L01vzGA-gLHWqW3-E_LeH29MfPFJsNaTN0&s=10',
    stock: 8,
    description: 'Mythic artwork • Strong lineage • Premium finish'
  },
  {
    name: 'Zoroark NXD',
    price: 5740,
    category: 'unova',
    season: 'unova',
    rarity: 'NXD',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLAlqEKHywek7VmBVjyiL_nFteu_vrQrAxNu9RDTBDoLLAapalIURD7Qx&s=10',
    stock: 9,
    description: 'NXD style • Clean design • Sharp contrast art'
  },
  {
    name: 'Kyurem Dragon',
    price: 8528,
    category: 'unova',
    season: 'unova',
    rarity: 'Collector',
    image: 'https://tcgplayer-cdn.tcgplayer.com/product/676096_in_1000x1000.jpg',
    stock: 4,
    description: 'Dragon collector • Rare energy • Premium print'
  },
  {
    name: 'Victini V',
    price: 5658,
    category: 'unova',
    season: 'unova',
    rarity: 'V',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdnSPf4_YKdc-eAeIL3Bh00T1FH8kBsgYxcTVj8YmuwtoDcExko44gsca1&s=10',
    stock: 10,
    description: 'Legendary mascot • Popular set pick • Affordable hype'
  },
  {
    name: 'Samurott EX',
    price: 5978,
    category: 'unova',
    season: 'unova',
    rarity: 'EX',
    image: 'https://tcgplayer-cdn.tcgplayer.com/product/111548_in_1000x1000.jpg',
    stock: 9,
    description: 'Heavy armor look • Balanced rarity • Great value'
  },
  {
    name: 'Purrloin Gold',
    price: 5576,
    category: 'unova',
    season: 'unova',
    rarity: 'Gold',
    image: 'https://i.ebayimg.com/images/g/4uwAAOSwIpFh35zs/s-l400.jpg',
    stock: 8,
    description: 'Gold foil • Cute collector price • Card market favorite'
  },
  {
    name: 'Talonflame Holo',
    price: 6560,
    category: 'unova',
    season: 'unova',
    rarity: 'Holo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMD_h_0EcTZdhOCe7PIlTtVhtNs8UCxnY2qH-ilzp53dYlPPufUzt3iOM&s=10',
    stock: 7,
    description: 'Holo glow • Game-ready • Bright FF finish'
  },
  {
    name: 'Emboar V',
    price: 7544,
    category: 'unova',
    season: 'unova',
    rarity: 'V',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWZJ46BYUSeZEGXtGe1dPqb38f5OWas1lmffvNTcDaXqwvFo93LD5_6o&s=10',
    stock: 6,
    description: 'Powerful V print • Strong collector momentum'
  },
  {
    name: 'Keldeo Prism',
    price: 7134,
    category: 'unova',
    season: 'unova',
    rarity: 'Prism',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1GejdGA5K4E0JNImMnNhtMkSsxLkSdZzDh6vC1hIKYA&s=10',
    stock: 5,
    description: 'Prism finish • Rare sheen • Dynamic display value'
  },
  {
    name: 'Serperior Reverse',
    price: 5904,
    category: 'unova',
    season: 'unova',
    rarity: 'Reverse',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCpu1Hv4EuOtKZLCEOWLtYzPR5mqkTSOHiM_ocsYe7jn3YJMzow0mz8g&s=10',
    stock: 10,
    description: 'Reverse holo • Elegant foliage art • Great starter card'
  },
  {
    name: 'Mega Gengar',
    price: 10660,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Mega',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1GejdGA5K4E0JNImMnNhtMkSsxLkSdZzDh6vC1hIKYA&s=10',
    stock: 3,
    description: 'Mega aura • High demand • Premium battle card'
  },
  {
    name: 'Sylveon EX',
    price: 6150,
    category: 'kalos',
    season: 'kalos',
    rarity: 'EX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDXvEcRvdQ6lHw0vDUbeiTWxpQZS5VI01T-KUEf9eLp_Q4tO22Do6dMiO6&s=10',
    stock: 8,
    description: 'Fairy theme • Elegant foil • Beloved collector card'
  },
  {
    name: 'Greninja Break',
    price: 7216,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Break',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2HkX-GMA79WBIv1uo3FvhRXHCVVUoOxSUzk4ij_c3qgP9KJT4E3SVl7w&s=10',
    stock: 5,
    description: 'Break style • High art value • Collector favorite'
  },
  {
    name: 'Mega Mewtwo',
    price: 13120,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Mega',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFlPQdr37wR5DEWR0EMLfo_aACEFjmXtrCyGWXkVpilLwC4iPU8c8kyOI&s=10',
    stock: 2,
    description: 'Elite rarity • Mega chaos • Top-tier display card'
  },
  {
    name: 'Diancie Prism',
    price: 7872,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Prism',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-2wJ3n8mDCYsWJfABuiqIqBPCKMECsLH5xob0N9mwzD4aY1S3r3ET_4&s=10',
    stock: 6,
    description: 'Prism sparkle • Crystal finish • Strong market trend'
  },
  {
    name: 'Aegislash V',
    price: 6396,
    category: 'kalos',
    season: 'kalos',
    rarity: 'V',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmWVmPkAQ38XFHlQvJ85Bt19HMqVj5Olrmd6qTgoS_1dbE9v9f8SlszA&s=10',
    stock: 8,
    description: 'Shield form • Sleek art • Collector-ready finish'
  },
  {
    name: 'Keldeo Rush',
    price: 5904,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Rush',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvO7_jLC6difh4pOrGuvRAQS3ViwR3vSeL38cQB6yPF2Ko4kiH8wi8kxh&s=10',
    stock: 9,
    description: 'Rush style • Clean foil • Great modern value'
  },
  {
    name: 'Gyarados Mega',
    price: 10988,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Mega',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBxnC93C9brUGKdPDQLXwEo91dgqB3ny5TEI8AM--QDwqjgHEcxoUB_SLd&s=10',
    stock: 4,
    description: 'Mega scaling • Legendary energy • Display-grade card'
  },
  {
    name: 'Meowscarda Holo',
    price: 5740,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Holo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTs_0GzTu-1S_TBwSHHsi6gZ97zJ0GfeUuXcyNrd3hg&s=10',
    stock: 10,
    description: 'Holo finish • Signature aura • Bright fan favorite'
  },
  {
    name: 'Fletchinder Gold',
    price: 6724,
    category: 'kalos',
    season: 'kalos',
    rarity: 'Gold',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT14pQACumpQC8ERWFtP81l7HQdCQvPYszTveRPCvpO2g4mccCE85Wdfc&s=10',
    stock: 7,
    description: 'Gold trim • Premium finish • Great for display'
  }
]

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments()
    if (count > 0) {
      console.log(`Product collection already has ${count} items. Skipping seed.`)
      return
    }

    const products = defaultProducts.map((product) => ({
      ...product,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
      description: product.description || 'Premium Pokémon card'
    }))

    const inserted = await Product.insertMany(products)
    console.log(`Seeded ${inserted.length} products into MongoDB.`)
  } catch (error) {
    console.error('Product seed failed:', error.message)
  }
}

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (!existingAdmin) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@pokevault.com'
      const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345'
      const adminUser = await User.create({
        name: 'PokéVault Admin',
        email: adminEmail.toLowerCase().trim(),
        password: adminPassword,
        role: 'admin'
      })
      console.log(`Default admin created: ${adminUser.email} / ${adminPassword}`)
    }
  } catch (error) {
    console.error('Admin seed failed:', error.message)
  }
}

module.exports = { defaultProducts, seedProducts, seedAdmin }

if (require.main === module) {
  require('dotenv').config()
  const mongoose = require('mongoose')
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pokevault'
  mongoose.connect(mongoUri)
    .then(async () => {
      console.log('Connected to MongoDB for seeding...')
      await seedProducts()
      await seedAdmin()
      await mongoose.disconnect()
      console.log('Seeding finished successfully.')
      process.exit(0)
    })
    .catch((err) => {
      console.error('Seeding script failed:', err.message)
      process.exit(1)
    })
}
