(() => {
    try {
        let items = [
            // Normal
            [0, 0, 'Syringe', 'Soldier\'s Syringe', 'offense,speed', 'syringe', 'Increase {offense:Attack Speed} by {offense:15%} {+15%}.'],
            [1, 0, 'Bear', 'Tougher Times', 'defense,block,locked', 'bear', '{defense:15%} {+15%} chance to {defense:block} incoming damage.\n{misc:Unaffected by the luck}.', 'Die 5 times.'],
            [6, 0, 'Tooth', 'Monster Tooth', 'defense,heal,on,kill', 'monsterTooth', 'Killing an ennemy spawns a {defense:healing orb} that {defense:heals} for {defense:6} {+6} {defense:health}.'],
            [7, 0, 'CritGlasses', 'Lens-Maker\'s Glasses', 'offense,critical,chance', 'glasses', 'Your attacks have a {offense:10%} {+10%} chance to \'{offense:Critically Strike}\', dealing {offense:double damage}.'],
            [8, 0, 'Hoof', 'Paul\'s Goat Hoof', 'defense,movespeed,locked', 'goat', 'Increases {misc:movement speed} by {misc:14%} {+14%}.', 'Fail the Shrine of chance 3 times in a row.'],
            [16, 0, 'Mushroom', 'Bustling Fungus', 'defense,heal,stand', 'fungus', 'After standing still for {defense:2} seconds create a zone that {defense:heals} for {defense:4.5%} {+2.25%} of your {defense:health} every second to all allies within {defense:3m} {+1.5m}.'],
            [17, 0, 'Crowbar', 'Crowbar', 'attack', 'crowbar', 'Deal {offense:150%} {+30%} damage to enemies above {offense:90% health}.', 'Discover 10 unique white items.'],
            [20, 0, 'BleedOnHit', 'Trip-Tip Dagger', 'offense,dot', 'tritip', '{offense:15%} {+15%} chance to {offense:bleed} an enemy for {offense:240%} base damage.'],
            [24, 0, 'LevelBonus', 'Warbanner', 'utility,attack,speed,movespeed,on,level', 'warbanner', 'On {misc:level up} drop a banner that strengthens all allies within {misc:16m} {+8m}.\nRaise {offense:attack} and {misc:movement speed} by {offense:30%}.'],
            [27, 0, 'HealWhileSafe', 'Cautious Slug', 'defense,heal', 'slug', 'Increases {defense:passive health regeneration} by {defense:250%} {150%} while outside of combat.'],
            [29, 0, 'PersonalShield', 'Personal Shield Generator', 'defense,shield', 'shield', 'Gain a {defense:25} {+25} {defense:health shield}.\nRecharges outside of danger.'],
            [36, 0, 'Medkit', 'Medkit', 'defense,heal,on,hit,locked', 'medkit', '{defense:Heal} for {defense:10} {+10} {defense:health} 1.1 seconds after getting hurt.', 'Defeat an Elite-type monster.'],
            [39, 0, 'IgniteOnKill', 'Gasoline', 'offense,fire,on,kill', 'gasoline', 'Killing an enemy {offense:ignites} all enemies within {offense:12m} {+4}.\nEnnemies {offense:burn} for {offense:150%} {+75%} base damage.'],
            [41, 0, 'StunChanceOnHit', 'Stun Grenade', 'offense,stun,on,hit', 'stunGrenade', '{misc:5%} {+5%} chance on hit to {misc:stun} enemies for {misc:2} seconds.'],
            [42, 0, 'Firework', 'Bundle of Fireworks', 'offense,on,open,locked', 'firework', 'Opening a chest {offense:launches 8} {+4} {offense:fireworks} that deal {offense:300%} base damage.', 'Duplicate the same item 7 times in a row with a 3D printer.'],
            [57, 0, 'SprintBonus', 'Energy Drink', 'defense,movespeed', 'drink', '{misc:Sprint speed} is improved by {misc:30%} {+20%}.'],
            [58, 0, 'SecondarySkillMagazine', 'Backup Magazine', 'utility,charge,locked', 'backupMag', 'Add {misc:+1} {+1} charge of your {misc:Secondary skill}.', 'Fully charge a Teleporter without getting hit.'],
            [59, 0, 'StickyBomb', 'Sticky Bomb', 'offense,on,hit', 'stickyBomb', '{offense:5%} {+2.5%} chance on hit to attach a {offense:bomb} to an enemy, detonating for {offense:180%} TOTAL damage.'],
            [60, 0, 'TreasureCache', 'Rusted Key', 'utility,box,locked', 'key', 'A {misc:hidden cache} containing an item will appear in a random location {misc:on each stage} {Increase rarity of the item}.', 'Defeat the Teleporter boss under 15 seconds.'],
            [61, 0, 'BossDamageBonus', 'Armor-Piercing Rounds', 'offense,boss,ammo,bullet,locked', 'bossDamage', 'Deal an additional {offense:20%} damage {+10%} to bosses.', 'Complete a Teleporter event.'],
            [78, 0, 'ExecuteLowHealthElite', 'Old Guillotine', 'offense,boss,locked', 'guillotine', 'Instantly kill Elite Monsters below {debuff:20%} {+5%} {debuff:health}.', 'Defeat 500 Elite Monsters.'],
            [84, 0, 'BarrierOnKill', 'Topaz Brooch', 'defense,shield,on,kill', 'shieldBrooch', 'Gain a {defense:temporary barrier} on kill for {defense:20 health} {+20}.'],
            // Uncommon
            [3, 1, 'Missile', 'AtG Missile Mk. 1', 'offense,on,hit', 'missile_mk', '{offense:10%} chance to fire a missile that deals {offense:300%} {+300%} damage.'],
            [4, 1, 'ExplodeOnDeath', 'Will-O\'-the-wisp', 'offense,on,kill', 'wisp', 'On killing an enemy, spawn a {offense:lava pillar} in a {offense:12m} {+2.4m} radius for {offense:350%} {+280%} base damage.'],
            [9, 1, 'Feather', 'Hopoo Feather', 'utility', 'feather', 'Gain {misc:+1} {+1} maximum {misc:jump count}.'],
            [11, 1, 'ChainLightning', 'Ukulele', 'offense,on,hit', 'ukulele', '{offense:25%} chance to fire a {offense:chain lightning} for {offense:80%} TOTAL damage up to {offense:3} {+2} targets within {offense:20m} {+2m}.'],
            [13, 1, 'Seed', 'Leeching Seed', 'defense,heal,on,hit', 'seed', 'Dealing damage {defense:heals} you for {defense:1} {+1} {defense:health}.'],
            [19, 1, 'AttackSpeedOnCrit', 'Predatory Instincts', 'offense,critical,locked', 'hat', '{offense:Critical Strikes} increase {offense:attack speed} by {offense:10%}.\nMaximum cap of {offense:30%} {+30%} {offense:attack speed}.', 'Reach +200% attack speed.'],
            [21, 1, 'SprintOutOfCombat', 'Red Whip', 'defense,movespeed', 'whip', 'Leaving combat boosts {misc:movement speed} by {misc:30%} {+30%}.'],
            [25, 1, 'Phasing', 'Old War Stealthkit', 'defense,phasing,invincible', 'phasing', 'Chance on taking damage to gain {misc:40% movement speed} and {misc:invisibility} for {misc:3s} {+1.5s}.\nChance increases the more damage you take.'],
            [26, 1, 'HealOnCrit', 'Harvester\'s Scythe', 'offense,defense,critical,heal,locked', 'scythe', 'Gain {offense:5% critical chance}.\n{offense:Critical strikes} {defense:heal} for {defense:8} {+4} {defense:health}.', 'Complete a Prismatic Trial.'],
            [30, 1, 'EquipmentMagazine', 'Fuel Cell', 'utility,charge,locked', 'cell', 'Hold an {misc:additional equipment charge} {+1}.\n{misc:Reduce equipment cooldown} by {misc:15%} {+15%}.', 'Pickup 5 different types of Equipment.'],
            [33, 1, 'Infusion', 'Infusion', 'defense,life,locked', 'infusion', 'Killing an enemy increases your {defense:health permanently} by {defense:1}, up to a {defense:maximum} of {defense:100} {+100} {defense:health}.', 'Defeat 3000 enemies.'],
            [37, 1, 'Bandolier', 'Bandolier', 'utility', 'bandolier', '{misc:18%} {+10%} chance on kill to drop an ammo pack that {misc:resets all cooldowns}.'],
            [46, 1, 'WarCryOnMultiKill', 'Berzerker\'s Pauldron', 'offense,movespeed,on,kill,locked', 'berzerk', '{offense:Killing 3 enemies} within {offense:1} second sends you into a {offense:frenzy} for {offense:6s} {+4s}.\nIncreases {misc:movement speed} by {misc:50%} and {offense:attack speed} by {offense:100%}.', 'Charge the Teleporter with less than 10% health.'],
            [62, 1, 'SprintArmor', 'Rose Buckler', 'defense,armour,shield', 'buckler', '{defense:Increase armor} by {defense:25} {+25} while {misc:sprinting}.'],
            [63, 1, 'IceRing', 'Runald\'s Band', 'offense,on,hit,locked', 'iceRing', '{offense:8%} chance on hit to strike an ennemy with a {offense:runic ice blast}, {misc:slowing} them by {misc:80%} and dealing {offense:250%} TOTAL damage {+125%}.', 'Discover the hidden chamber in the Abandonned Aqueduct.'],
            [64, 1, 'FireRing', 'Kjaro\'s Band', 'offense,on,hit,locked', 'fireRing', '{offense:8%} chance on hit to strike an ennemy with a {offense:runic flame tornado}, dealing {offense:500%} TOTAL damage {+250%}.', 'Discover the hidden chamber in the Abandonned Aqueduct.'],
            [65, 1, 'SlowOnHit', 'Chronobauble', 'offense,on,hit', 'bauble', '{misc:Slow} enemies for {misc:-60% movement speed} for {misc:2s} {+2s}.'],
            [76, 1, 'JumpBoost', 'Wax Quail', 'defense,movespeed,pigeon,locked', 'quail', '{defense:Jumping} while {defense:sprinting} boosts you forward by {defense:10m} {+10m}.', 'Reach +300% movespeed (include sprinting).'],
            [79, 1, 'EnergizedOnEquipmentUse', 'War Horn', 'offense,attack,speed,equipment,locked', 'warHorn', 'Activating your Equipment gives you {offense:+70% attack speed} for {offense:8s} {+4s}.', 'Complete 3 Combat Shrines in a single stage.'],
            // Rare
            [2, 2, 'Behemoth', 'Brilliant Behemoth', 'offense,explosion,on,hit', 'behemoth', 'All your {offense:attacks explode} in a {offense:4m} {+1.5m} radius for a bonus {offense:60%} TOTAL damage to nearby enemies.'],
            [5, 2, 'Dagger', 'Ceremonial Dagger', 'offense,on,kill,tracking,attack', 'dagger', 'Killing an enemy fires out {offense:3 homing daggers} that deal {offense:150%} {+150%} base damage.'],
            [14, 2, 'Icicle', 'Frost Relic', 'offense,on,kill', 'ice', 'Killing an enemy surrounds you with an {offense:ice storm} that deals {offense:600% damage per second}.\nThe storm {offense:grows with every kill}, increasing it\'s radius by {offense:1m}.\nStacks up to {offense:6m} {+6m}.'],
            [15, 2, 'GhostOnKill', 'Happiest Mask', 'offense,on,kill', 'mask', 'Killing enemies has a {offense:10%} chance to {offense:spawn a ghost} of the killed enemy with {offense:500%} damage. Lasts {offense:30s} {+30s}.'],
            [22, 2, 'FallBoots', 'H3AD-5T v2', 'defense,attack,fall', 'cuffs', 'Increase {misc:jump height}.\nCreates a {offense:10m} radius {offense:kinetic explosion} on hitting the ground, dealing {offense:2300%} base damage that scales up with {offense:speed}.\nRecharges in {offense:10} {-50%} seconds.'],
            [31, 2, 'NovaOnHeal', 'N\'kuhana\'s Opinion', 'offense,locked', 'opinion', 'Store {defense:100%} {+100%} of healing as {defense:Soul Energy}.\nAfter your {defense:Soul Energy} reaches {defense:10%} of your {defense:maximum health}, {offense:fire a skull} that deals {offense:250%} of your {defense:Soul Energy} as {offense:damage}.', 'Find the Altar to N\'kuhana.'],
            [32, 2, 'ShockNearby', 'Unstable Tesla Coil', 'offense,close,locked', 'tesla', 'Fire out {offense:lightning} that hits {offense:3} {+3} enemies for {offense:200%} base damage every {offense:0.5s}.\nThe Tesla Coil switches off every {offense:10 seconds}.', 'Deal 5000 damage in one shot.'],
            [35, 2, 'Clover', '57 Leaf Clover', 'utility,locked', 'clover', 'All random effects are rolled {misc:+1} {+1} {misc:times for a favorable outcome}.', 'Complete 20 stages in a single run.'],
            [38, 2, 'BounceNearby', 'Sentient Meat Hook', 'offense,utility,grab,locked', 'hook', '{offense:20%} {+20%} chance on hit to {offense:fire homing hooks} at up to {offense:10} {+5} enemies for {offense:100%} TOTAL damage.', 'Loop back to the first stage.'],
            [50, 2, 'AlienHead', 'Alien Head', 'utility', 'alien', '{misc:Reduce skill cooldown} by {misc:25%} {+25%}.'],
            [51, 2, 'Talisman', 'Souldbound Catalyst', 'utility,equipment,locked', 'soul', '{offense:Kills reduce} {misc:equipment cooldown} by {misc:4s} {+2s}.', 'Discover and activate 8 unique Newt Altars.'],
            [66, 2, 'ExtraLife', 'Dio\'s Best Friend', 'utility,bear,death,jojo,revive,res,locked', 'dio', '{misc:Upon Death}, this item will be {misc:consumed} and you will {defense:return to life} with {defense:3 seconds of invulnerability}.', 'Stay alive for 30 consecutive minutes.'],
            [68, 2, 'UtilitySkillMagazine', 'Hardlight Afterburner', 'utility,charge',  'burner', 'Add {misc:+2} {+2} charges of your {misc:Utility skill}.\n{misc:Reduces Utility skill cooldown} by {misc:33%}.'],
            [69, 2, 'HeadHunter', 'Wake of Vultures', 'utility,elite,poe,headhunter', 'headhunter', 'Gain the {offense:power} of any killed elite monster for {offense:8s} {+5s}.'],
            [70, 2, 'KillEliteFrenzy', 'Brainstalks', 'offense,locked', 'brain', 'Upon killing an elite monster, {offense:enter a frenzy} for {offense:3s} {+2s} where {misc:skills have no cooldowns}.', 'Defeat an Elite boss on Monsoon difficulty.'],
            [75, 2, 'IncreaseHealing', 'Rejuvenation Rack', 'defense,heal,double,locked', 'horn', '{defense:Heal +100%} {+100%} more.', 'Without healing, reach and complete the 3rd Teleporter event.'],
            [80, 2, 'BarrierOnOverHeal', 'Aegis', 'utility,heal,defense', 'fullBarrier', 'Healing past full grants you a {defense:temporary barrier} for up to {defense:20%} {+20%} of your {defense:maximum health}.'],
            // Unique
            [52, 3, 'Knurl', 'Titanic Knurl', 'defense,life', 'knurl', '{defense:Increases maximum health} by {defense:40} {+40} and {defense:health regeneration} by {defense:1.6} {+1.6} {defense:health / second}.'],
            [53, 3, 'BeetleGland', 'Queen\'s Gland', 'utility,invocation', 'beetle', 'Every 30 seconds, {misc:summon a Beetle Guard} with bonus {offense:300%} damage and {defense:100%} health.\nCan have up to {misc:1} {+1} Guards at a time.'],
            [82, 3, 'TitanGoldDuringTP', 'Halcyon Seed', 'utility,invocation,boss,summon', 'goldenSeed', 'Summon {offense:Aurelionite} during the teleporter event.\nIt has {offense:100%} {+50%} {offense:damage} and {defense:100%} {+100%} {defense:health}.'],
            [83, 3, 'SprintWisp', 'Little Disciple', 'offense,tracking,sprint,attack', 'sprintingWisp', 'Fire a {offense:tracking wisp} for {offense:100%} {+100%} {offense:damage}.\nFires every 0.5 seconds while sprinting.'],
            // Lunar
            [43, 4, 'LunarDagger', 'Shaped Glass', 'offense,suicide', 'sword', 'Increase base damage by {offense:100%} {+100%}.\n{defense:Reduce maximum health by 50%} {+50%}.'],
            [44, 4, 'GoldOnHit', 'Brittle Crown', 'utility', 'crown', '{misc:30% chance on hit} to gain {misc:3} {+3} {misc:gold}.\n{debuff:Lose gold} equal to {debuff:100%} {+100%} of amount your are hit for OR lose % gold equal to {debuff:100%} {+100%} of the maximum health % you lost.\nChooses the greater of the two.'],
            [49, 4, 'ShieldOnly', 'Transcendence', 'defense,chaos', 'transc', '{defense:Convert} all but {defense:1 health} into {defense:regenerating shields}.\n{defense:Gain 50%} {+25%} {defense:maximum health}.'],
            [71, 4, 'RepeatHeal', 'Corpsebloom', 'defense,heal,dot', 'flower', '{defense:Heal +100%} {+100%} more.\n{defense:All healing is applied over time}.\nCan {defense:heal} for a {defense:maximum} of {defense:10%} {-50%} of your {defense:health per second}.'],
            [74, 4, 'AutoCastEquipment', 'Gesture of the Drowned', 'utility,equipment,locked', 'fossil', '{misc:Reduce equipment cooldown} by {misc:50%} {+50%}.\nForces your Equipment to {misc:activate} whenever it is off {misc:cooldown}.', 'Kill 20 Hermit Crabs by chasing them off the edge of the map.'],
            [3, 4, 'Meteor', 'Glowing Meteorite', 'offense,suicide,equipment,locked', 'meteorite', '{offense:Rain meteors} from the sky, damaging ALL characters for {offense:600% damage per blast}.\nLast 20 seconds.', 'Carry 5 Lunar items in a single run.'],
            [23, 4, 'BurnNearby', 'Helfire Tincture', 'offense,suicide,fire,equipment,locked', 'burn', 'Ignite ALL characters within 8m. Deal {offense:5% of your maximum health/second as burning} to yourself.\nThe burn is {offense:0.5x} stronger on allies, and {offense:24x} stronger on enemies.', 'Kill 15 enemies simultaneously.'],
            [26, 4, 'CrippleWard', 'Effigy of Grief', 'utility,equipment', 'slow', 'ALL characters are {misc:slowed by 50%} and has their {offense:armor reduced by 20}.'],
            [28, 4, 'Tonic', 'Spinel Affliction', 'utility,buff,debuff,attack,speed,movespeed,health,regen', 'tonic', 'Drink the Tonic, gaining a boost for 15 seconds.\nIncreases {offense:damage} by {offense:+100%}.\nIncreases {offense:attack speed} by {offense:+70%}.\nIncreases {offense:armor} by {offense:+20}.\nIncreases {defense:maximum health} by {defense:+50%}.\nIncreases {defense:passive health regeneration} by {defense:+300%}.\nIncreases {misc:movespeed} by {misc:+30%}.\nWhen the tonic wears off, you have {debuff:20%} chance to gain a {debuff:Tonic Affliction, reducing all of your stats} by {debuff:-5%} {-5%}', 'Discover and enter three unique portals.'],
            // Equipments
            [0, 5, 'CommandMissile', 'Disposable Missile Launcher', 'attack', 'missile', 'Fire a swarm of {offense:12} missiles that deal {offense:12x300%} damage.'],
            [2, 5, 'Fruit', 'Foreign Fruit', 'defense,heal', 'fruit', 'Instantly heal for {defense:50% of your maximum health}.'],
            [11, 5, 'Blackhole', 'Blackhole', 'offense,stack', 'blackhole', 'Fire a black hole that {misc:draws enemies within 30m into it\'s center}.\nLast 10 seconds.'],
            [13, 5, 'CritOnUse', 'Ocular HUD', 'attack', 'hud', 'Gain {offense:+100% Critical Strike Chance} for 8 seconds.'],
            [14, 5, 'DroneBackup', 'The Back-up', 'utility,locked', 'drone', 'Call {offense:4 Strike Drones} to fight for you.\nLast 25 seconds.', 'Repair 30 drones or turrets.'],
            [16, 5, 'BFG', 'Preon Accumulator', 'offense,locked', 'beam', 'Fires preon tendrils, zapping enemies within 35m up to {offense:600% damage/second}.\nOn contact, detonate in an enormous 20m explosion for {offense:4000% damage}.', 'Open the Timed Security Chest on Rallypoint Delta.'],
            [18, 5, 'Jetpack', 'Milky Chrisalis', 'utility,movespeed', 'larva', 'Sprout wings and {misc:fly for 15 seconds}.\nGain {misc:+20% movement speed} for the duration.'],
            [19, 5, 'Lightning', 'Royal Capacitor', 'offense,locked', 'lightning', 'Call down a lightning strike on a targeted monster, dealing {offense:3000% damage} and {offense:stunning} nearby monsters.', 'Defeat the Teleporter bosses after activating 2 Shrines of the Moutain.'],
            [20, 5, 'GoldGat', 'The Crowdfunder', 'offense,troll,locked', 'gatling', 'Fires a continuous barrage that deals {offense:100% damage per bullet}.\nCosts $1 per bullet. Costs increases over time.', 'Collect $30,480 total gold.'],
            [21, 5, 'PassiveHealing', 'Gnarled Woodsprite', 'defense,heal,locked', 'spirit', 'Gain a Woodsprite follower that heals for {defense:1.5% of your maximum health/second}.\nCan be sent to an ally to heal them for {defense:10% of their maximum health}.', 'Fully upgrade a Shrine of the Woods.'],
            [25, 5, 'Scanner', 'Radar Scanner', 'utility,scan,locked', 'radar', '{misc:Reveal} all interactables within 500m for {misc:10 seconds}.', 'Collect 10 Monster or Environment Logs.'],
            [27, 5, 'Gateway', 'Eccentric Vase', 'utility,scan,locked', 'vase', 'Create a {misc:quantum tunnel} of up to {misc:1000m} in length. Lasts 30 seconds.', 'Defeat the guardian of Gilded Coast without any beacons deactivating.'],
            // Drop
            [5, 5, 'AffixRed', 'Ifrit\'s Distinction', 'offense,fire,drop', 'fireAspect', 'Become an aspect of fire.', 'Drop from Fire Elite enemies.'],
            [6, 5, 'AffixBlue', 'Silent Between Two Strikes', 'offense,lightning,drop', 'lightningAspect', 'Become an aspect of lightning.', 'Drop from Lightning Elite enemies.'],
            [9, 5, 'AffixWhite', 'Her Biting Embrace', 'offense,ice,drop', 'iceAspect', 'Become an aspect of ice.', 'Drop from Ice Elite enemies.'],
        ];
        let itemObjects = [];
        let rarities = ['common', 'uncommon', 'rare', 'unique', 'lunar', 'equipment'];
        let lunarEquipments = [3, 23, 26];
        let itemCount = items.length;
        let itemList = document.getElementById("items");
        for (let i = 0; i < itemCount; i++) {
            if (items[i].length < 6) continue;
            let currentItem = {
                id: items[i][0],
                rarity: items[i][1],
                gameName: items[i][2],
                name: items[i][3],
                tags: items[i][4],
                img: items[i][5],
                description: items[i][6],
                info: items[i][7] || undefined,
                node: undefined,
            };
            // Create card
            let container = document.createElement("div");
            container.className = "column is-one-third-widescreen is-half-desktop is-full-touch";
            currentItem.node = container;
            let card = document.createElement("div");
            card.className = ["card is-", rarities[currentItem.rarity]].join("");;
            // header
            let header = document.createElement("header");
            header.className = "card-header";
            let name = document.createElement("h1");
            name.className = "card-header-title is-size-4";
            name.title = currentItem.name;
            name.textContent = currentItem.name;
            let itemID = document.createElement("span");
            itemID.className = "card-header-icon is-hidden-touch";
            itemID.textContent = ['#', currentItem.id].join('');
            // Content
            let content = document.createElement("div");
            content.className = "card-content";
            let columns = document.createElement("div");
            columns.className = "columns is-mobile is-marginless";
            let imageColumn = document.createElement("div");
            imageColumn.className = "column is-paddingless is-narrow is-item-image";
            let imageSrc = ["img/", currentItem.img, ".png"].join("");
            let image = document.createElement("img");
            image.src = imageSrc;
            image.width = 90;
            image.height = 90;
            image.title = "Click to copy give command";
            image.addEventListener("click", event => {
                let give = "give_item";
                if (currentItem.rarity == 5 ||
                    (currentItem.rarity == 4 && lunarEquipments.indexOf(currentItem.id) >= 0)) {
                    give = "give_equip";
                }
                navigator.clipboard.writeText([give, " ", currentItem.id, " 1"].join(""))
                    .then(() => {
                        SimpleNotification.success("Copied", ["**", currentItem.name, "** give command has been copied."].join(""), imageSrc, { duration: 1200, position: "bottom-left" });
                    })
                    .catch(error => {
                        SimpleNotification.error("Error", ["Could not copy the give command:\n", error].join(""), imageSrc, { duration: 1200, position: "bottom-left" });
                    });
            });
            let descriptionColumn = document.createElement("div");
            descriptionColumn.className = "column is-item-description";
            beautify(descriptionColumn, currentItem.description);
            if (currentItem.info != undefined) {
                let unlockDescription = document.createElement("div");
                unlockDescription.className = "is-unlock-description";
                unlockDescription.textContent = [currentItem.info, "\nClick to hide."].join("");
                unlockDescription.addEventListener("click", event => {
                    unlockDescription.classList.toggle("is-shown");
                });
                content.appendChild(unlockDescription);
                let unlockButton = document.createElement("button");
                unlockButton.className = "button is-primary is-small is-fullwidth";
                unlockButton.textContent = "Show Unlock";
                unlockButton.addEventListener("click", event => {
                    unlockDescription.classList.toggle("is-shown");
                });
                descriptionColumn.appendChild(unlockButton);
            }
            // Append
            header.appendChild(name);
            header.appendChild(itemID);
            content.appendChild(columns);
            columns.appendChild(imageColumn);
            imageColumn.appendChild(image);
            columns.appendChild(descriptionColumn);
            content.appendChild(columns);
            card.appendChild(header);
            card.appendChild(content);
            container.appendChild(card);
            itemList.appendChild(container);
            // Lower case for search
            currentItem.search = [rarities[currentItem.rarity], currentItem.name, currentItem.tags, currentItem.gameName, currentItem.description].join(" ").toLowerCase();
            itemObjects.push(currentItem);
        }

        function beautify(node, text) {
            // Normalize linebreak
            text = text.replace(/(\r?\n|\r)/gm, "\n");
            // Find tokens
            let specialNodes = [];
            let specialCount = 0;
            let lastTokenPos = 0;
            // Find strings that match tag
            let foundOpenPos, foundClosePos;
            while ((foundOpenPos = text.indexOf("{", lastTokenPos)) > -1) {
                foundOpenPos += 1; // Add the tag length to the found position
                // Find the closing tag
                if ((foundClosePos = text.indexOf("}", foundOpenPos)) > -1 && foundOpenPos != foundClosePos) {
                    let foundResult = text.substring(foundOpenPos, foundClosePos);
                    // Find the category
                    let category = undefined;
                    if ((foundCategoryPos = foundResult.indexOf(":")) > -1) {
                        category = foundResult.substring(0, foundCategoryPos);
                        foundResult = foundResult.substring(foundCategoryPos+1);
                    }
                    // Add the found tag to the list
                    specialNodes.push({
                        text: foundResult,
                        category: category
                    });
                    // Replace the string by a token \id\
                    // Remove the tagLength from foundOpenPos to capture the tag
                    // Add the tagLength to foundClosePos to also capture the tag
                    let newText = text.substring(0, foundOpenPos - 1) + "[[$" + specialCount + "]]" + text.substring(foundClosePos + 1);
                    text = newText;
                    specialCount++;
                }
                // Update lastTokenPos to reduce the string length to search
                lastTokenPos = foundOpenPos;
            }
            if (specialNodes.length > 0) {
                let parts = text.split(/\[\[\$(\d+)\]\]/);
                let lastPart = parts.length;
                for (let i = 0; i < lastPart; i++) {
                    // even index is simple text
                    if (i % 2 == 0) {
                        node.appendChild(document.createTextNode(parts[i]));
                    } else {
                        let specialInfo = specialNodes[Math.floor(parts[i])];
                        let specialNode = document.createElement("span");
                        if (specialInfo.category == undefined) {
                            specialNode.className = "is-stackable";
                            specialNode.textContent = ["(", specialInfo.text, " per stack)"].join("");
                        } else {
                            specialNode.className = ["is-", specialInfo.category].join("");
                            specialNode.textContent = specialInfo.text;
                        }
                        node.appendChild(specialNode);
                    }
                }
            } else {
                node.textContent = text;
            }
        }

        let itemObjectsCount = itemObjects.length;
        let noResult = document.getElementById("noResult");
        function search(query) {
            query = query.trim().toLowerCase();
            if (query == "") {
                itemList.querySelectorAll(".is-hidden").forEach(element => {
                    element.classList.remove("is-hidden");
                });
                noResult.classList.add("is-hidden");
                return;
            }
            let count = 0;
            for (let i = 0; i < itemObjectsCount; i++) {
                let item = itemObjects[i];
                if (item.search.indexOf(query) < 0) {
                    item.node.classList.add("is-hidden");
                } else {
                    count++;
                    item.node.classList.remove("is-hidden");
                }
            }
            if (count == 0) {
                noResult.classList.remove("is-hidden");
            } else {
                noResult.classList.add("is-hidden");
            }
        }

        document.getElementById("search").addEventListener("input", event => {
            search(event.target.value);
        });
        document.getElementById("form").addEventListener("submit", event => {
            event.preventDefault();
            search(event.target.query.value);
        });
        document.getElementById("form").addEventListener("reset", () => {
            search("");
        });
    } catch (error) {
        console.error(error);
    }
})();