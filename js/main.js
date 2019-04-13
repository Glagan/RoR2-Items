(() => {
    try {
        let items = [
            // Normal
            [0, 0, 'Syringe', 'Soldier\'s Syringe', 'offense,speed', 'syringe', 'Increase Attack Speed by 15% {+15%}.'],
            [1, 0, 'Bear', 'Tougher Times', 'defense,block,locked', 'bear', '15% {+15%} chance to block incoming damage.\nUnaffected by the luck.', 'Die 5 times.'],
            [6, 0, 'Tooth', 'Monster Tooth', 'defense,heal,on,kill', 'monsterTooth', 'Killing an ennemy spawns a healing orb that heals for 4 {+4}.'],
            [7, 0, 'CritGlasses', 'Lens-Maker\'s Glasses', 'offense,critical,chance', 'glasses', 'Your attacks have a 10% {+10%} chance to \'Critically Strike\', dealing double damage.'],
            [8, 0, 'Hoof', 'Paul\'s Goat Hoof', 'defense,movespeed,locked', 'goat', 'Increases movement speed by 14% {+14%}.', 'Fail the Shrine of chance 3 times in a row.'],
            [16, 0, 'Mushroom', 'Bustling Fungus', 'defense,heal,stand', 'fungus', 'After standing still for 2 seconds create a zone that heals for 4.5% {+2.25%} of your health every second to all allies within 3m {+1.5m}.'],
            [17, 0, 'Crowbar', 'Crowbar', 'attack', 'crowbar', 'Deal 150% {+30%} damage to enemies above 90% health.', 'Discover 10 unique white items.'],
            [20, 0, 'BleedOnHit', 'Trip-Tip Dagger', 'offense,dot', 'tritip', '15% {+15%} chance to bleed an enemy for 240% base damage.'],
            [24, 0, 'LevelBonus', 'Warbanner', 'utility,attack,speed,movespeed,on,level', 'warbanner', 'On level up drop a banner that strengthens all allies within 16m {+8m}.\nRaise attack and movement speed by 30%.'],
            [27, 0, 'HealWhileSafe', 'Cautious Slug', 'defense,heal', 'slug', 'Increases passive health regeneration by 250% {150%} while outside of combat.'],
            [29, 0, 'PersonalShield', 'Personal Shield Generator', 'defense,shield', 'shield', 'Gain a 25 {+25} health shield.\nRecharges outside of danger.'],
            [36, 0, 'Medkit', 'Medkit', 'defense,heal,on,hit,locked', 'medkit', 'Heal for 10 {+10} health 1.1 seconds after getting hurt.', 'Defeat an Elite-type monster.'],
            [39, 0, 'IgniteOnKill', 'Gasoline', 'offense,fire,on,kill', 'gasoline', 'Killing an enemy ignites all enemies within 12m {+4}.\nEnnemies burn for 150% {+75%} base damage.'],
            [41, 0, 'StunChanceOnHit', 'Stun Grenade', 'offense,stun,on,hit', 'stunGrenade', '5% {+5%} chance on hit to stun enemies for 2 seconds.'],
            [42, 0, 'Firework', 'Bundle of Fireworks', 'offense,on,open,locked', 'firework', 'Opening a chest launches 8 {+4} fireworks that deal 300% base damage.', 'Duplicate the same item 7 times in a row with a 3D printer.'],
            [57, 0, 'SprintBonus', 'Energy Drink', 'defense,movespeed', 'drink', 'Sprint speed is improved by 30% {+20%}.'],
            [58, 0, 'SecondarySkillMagazine', 'Backup Magazine', 'utility,charge,locked', 'backupMag', 'Add +1 {+1} charge of your Secondary skill.', 'Fully charge a Teleporter without getting hit.'],
            [59, 0, 'StickyBomb', 'Sticky Bomb', 'offense,on,hit', 'stickyBomb', '5% {+2.5%} chance on hit to attach a bomb to an enemy, detonating for 250% damage {+125%}.'],
            [60, 0, 'TreasureCache', 'Rusted Key', 'utility,box,locked', 'key', 'A hidden cache containing an item will appear in a random location in each stage {Increase rarity of the item}.', 'Defeat the Teleporter boss under 15 seconds.'],
            [61, 0, 'BossDamageBonus', 'Armor-Piercing Rounds', 'offense,boss,ammo,bullet,locked', 'bossDamage', 'Deal an additional 20% damage {+10%} to bosses.', 'Complete a Teleporter event.'],
            // Uncommon
            [3, 1, 'Missile', 'AtG Missile Mk. 1', 'offense,on,hit', 'missile_mk', '10% chance to fire a missile that deals 300% {+300%} damage.'],
            [4, 1, 'ExplodeOnDeath', 'Will-O\'-the-wisp', 'offense,on,kill', 'wisp', 'On killing an enemy, spawn a lava pillar in a 12m {+2.4m} radius for 350% {+280%} base damage.'],
            [9, 1, 'Feather', 'Hopoo Feather', 'utility', 'feather', 'Gain +1 {+1} maximum jump count.'],
            [11, 1, 'ChainLightning', 'Ukulele', 'offense,on,hit', 'ukulele', '25% chance to fire a chain lightning for 80% damage up to 3 {+2} targets within 20m {+2m}.'],
            [13, 1, 'Seed', 'Leeching Seed', 'defense,heal,on,hit', 'seed', 'Dealing damage heals you for 1 {+1} health.'],
            [19, 1, 'AttackSpeedOnCrit', 'Predatory Instincts', 'offense,critical,locked', 'hat', 'Critical Strikes increase attack speed by 10%.\nMaximum cap of 30% {+30%} attack speed.', 'Reach +200% attack speed.'],
            [21, 1, 'SprintOutOfCombat', 'Red Whip', 'defense,movespeed', 'whip', 'Leaving combat boosts movement speed by 30% {+30%}.'],
            [25, 1, 'Phasing', 'Old War Stealthkit', 'defense,phasing,invincible', 'phasing', 'Chance on taking damage to gain 40% movement speed and invisibility for 3s {+1.5s}.\nChance increases the more damage you take.'],
            [26, 1, 'HealOnCrit', 'Harvester\'s Scythe', 'offense,defense,critical,heal,locked', 'scythe', 'Gain 5% critical chance.\nCritical strikes heal for 8 {+4} health.', 'Complete a Prismatic Trial.'],
            [30, 1, 'EquipmentMagazine', 'Fuel Cell', 'utility,charge,locked', 'cell', 'Hold an additional equipment charge {+1}.\nReduce equipment cooldown by 15% {+15%}.', 'Pickup 5 different types of Equipment.'],
            [33, 1, 'Infusion', 'Infusion', 'defense,life,locked', 'infusion', 'Killing an enemy increases your health permanently by 1, up to a maximum of 100 {+100} health.', 'Defeat 3000 enemies.'],
            [37, 1, 'Bandolier', 'Bandolier', 'utility', 'bandolier', '18% {+10%} chance on kill to drop an ammo pack that resets all cooldowns.'],
            [46, 1, 'WarCryOnMultiKill', 'Berzerker\'s Pauldron', 'offense,movespeed,on,kill,locked', 'berzerk', 'Killing 3 enemies within 1 second sends you into a frenzy for 6s {+4s}.\nIncreases movement speed by 50% and attack speed by 100%.', 'Charge the Teleporter with less than 10% health.'],
            [62, 1, 'SprintArmor', 'Rose Buckler', 'defense,armour,shield', 'buckler', 'Increase armor by 25 {+25} while sprinting.'],
            [63, 1, 'IceRing', 'Runald\'s Band', 'offense,on,hit,locked', 'iceRing', '8% chance on hit to strike an ennemy with a runic ice blast, slowing them by 80% and dealing 250% damage {+125%}.', 'Discover the hidden chamber in the Abandonned Aqueduct.'],
            [64, 1, 'FireRing', 'Kjaro\'s Band', 'offense,on,hit,locked', 'fireRing', '8% chance on hit to strike an ennemy with a runic flame tornado, dSealing 500% damage {+250%}.', 'Discover the hidden chamber in the Abandonned Aqueduct.'],
            [65, 1, 'SlowOnHit', 'Chronobauble', 'offense,on,hit', 'bauble', 'Slow enemies for -60% movement speed for 1s {+1s}.'],
            [76, 1, 'JumpBoost', 'Wax Quail', 'defense,movespeed,pigeon,locked', 'quail', 'Jumping while sprinting boosts you forward by 10m {+10m}.', 'Reach +300% movespeed (include sprinting).'],
            // Rare
            [2, 2, 'Behemoth', 'Brilliant Behemoth', 'offense,explosion,on,hit', 'behemoth', 'All your attacks explode in a 4m {+1.5m} radius for a bonus 60% damage to nearby enemies.'],
            [5, 2, 'Dagger', 'Ceremonial Dagger', 'offense,on,kill', 'dagger', 'Killing an enemy releases homing daggers.'],
            [14, 2, 'Icicle', 'Frost Relic', 'offense,on,kill', 'ice', 'Killing an enemy surrounds you with 3 icicles that deal 3x33% damage.'],
            [15, 2, 'GhostOnKill', 'Happiest Mask', 'offense,on,kill', 'mask', 'Killing enemies has a 10% chance to spawn a ghost of the killed enemy with 500% damage. Last 30s {+30s}.'],
            [22, 2, 'FallBoots', 'H3AD-5T v2', 'defense,attack,fall', 'cuffs', 'Increase jump height.\nCreates a 10m radius kinetic explosion on hitting the ground, dealing 2300% base damage that scales up with the speed.\nRecharges in 10 {-50%} seconds.'],
            [31, 2, 'NovaOnHeal', 'N\'kuhana\'s Opinion', 'offense,locked', 'opinion', 'Store 100% {+100%} of healing as Soul Energy.\nAfter your soul Energy reaches 10% of your maximum health, fire a skull that deals 250% of your Soul Energy as damage.', 'Find the Altar to N\'kuhana.'],
            [32, 2, 'ShockNearby', 'Unstable Tesla Coil', 'offense,close,locked', 'tesla', 'Fire out lightning that hits 3 {+3} enemies for 200% base damage every 0.5 seconds.\nThe Tesla Coil switches off every 10 seconds.', 'Deal 5000 damage in one shot.'],
            [35, 2, 'Clover', '57 Leaf Clover', 'utility,locked', 'clover', 'All random effects are rolled +1 {+1} times for a favorable outcome.', 'Complete 20 stages in a single run.'],
            [38, 2, 'BounceNearby', 'Sentient Meat Hook', 'offense,utility,grab,locked', 'hook', '20% {+20%} chance on hit to fire homing hooks at up to 10 {+5} enemies for 100% damage.', 'Loop back to the first stage.'],
            [50, 2, 'AlienHead', 'Alien Head', 'utility', 'alien', 'Reduce skill cooldown by 25% {+25%}.'],
            [51, 2, 'Talisman', 'Souldbound Catalyst', 'utility,equipment,locked', 'soul', 'Kills reduce equipment cooldown by 4s {+2s}.', 'Discover and activate 8 unique Newt Altars.'],
            [66, 2, 'ExtraLife', 'Dio\'s Best Friend', 'utility,bear,death,jojo,locked', 'dio', 'Upon Death, this item will be consumed and you will return to life with 3 seconds of invulnerability.', 'Stay alive for 30 consecutive minutes.'],
            [68, 2, 'UtilitySkillMagazine', 'Hardlight Afterburner', 'utility,charge',  'burner', 'Add +2 {+2} charges of your Utility skill.\nReduces Utility skill cooldown by 33%.'],
            [69, 2, 'HeadHunter', 'Wake of Vultures', 'utility,useless,poe,headhunter', 'headhunter', 'Gain the power of any killed elite monster for 8s {+5s}.'],
            [70, 2, 'KillEliteFrenzy', 'Brainstalks', 'offense,locked', 'brain', 'Upon killing an elite monster, enter a frenzy for 3s {+2s} where skills have no cooldowns.', 'Defeat an Elite boss on Monsoon difficulty.'],
            [75, 2, 'IncreaseHealing', 'Rejuvenation Rack', 'defense,heal,double,locked', 'horn', 'Heal +100% {+100%} more.', 'Without healing, reach and complete the 3rd Teleporter event.'],
            // Unique
            [52, 3, 'Knurl', 'Titanic Knurl', 'defense,life', 'knurl', 'Increases maximum health by 40 {+40} and health regeneration by 1.6 {+1.6} health/second.'],
            [53, 3, 'BeetleGland', 'Queen\'s Gland', 'utility,invocation', 'beetle', 'Every 30 seconds, summon a Beetle Guard with bonus 300% damage and 100% health.\nCan have up to 1 {+1} Guards at a time.'],
            // Lunar
            [43, 4, 'LunarDagger', 'Shaped Glass', 'offense,suicide', 'sword', 'Increase base damage by 100% {+100%}.\nReduce maximum health by 50% {+50%}.'],
            [44, 4, 'GoldOnHit', 'Brittle Crown', 'utility', 'crown', '30% chance on hit to gain 3 {+3} gold.\nLose gold equal to the amount you are hit for OR lose % gold equal to the % maximum health you lost.\nChooses the greater of the two.'],
            [49, 4, 'ShieldOnly', 'Transcendence', 'defense,chaos', 'transc', 'Convert all but 1 health into regenerating shields.\nGain 50% {+25%} maximum health.'],
            [71, 4, 'RepeatHeal', 'Corpsebloom', 'defense,heal,dot', 'flower', 'Heal +100% {+100%} more.\nAll healing is applied over time.\nCan heal for a maximum of 10% {-50%} of your health per second.'],
            [74, 4, 'AutoCastEquipment', 'Gesture of the Drowned', 'utility,equipment,locked', 'fossil', 'Reduce equipment cooldown by 50% {+50%}.\nForces your Equipment to activate whenever it is off cooldown.', 'Kill 20 Hermit Crabs by chasing them off the edge of the map.'],
            [3, 4, 'Meteor', 'Glowing Meteorite', 'offense,suicide,equipment,locked', 'meteorite', 'Rain meteors from the sky, damaging ALL characters for 600% damage per blast.\nLast 20 seconds.', 'Carry 5 Lunar items in a single run.'],
            [23, 4, 'BurnNearby', 'Helfire Tincture', 'offense,suicide,fire,equipment,locked', 'burn', 'Ignite ALL characters within 8m. Deal 5% of your maximum health/second as burning to yourself.\nThe burn is 0.5x stronger on allies, and 24x stronger on enemies.', 'Kill 15 enemies simultaneously.'],
            [26, 4, 'CrippleWard', 'Effigy of Grief', 'utility,equipment', 'slow', 'ALL characters are slowed by 50% and has their armor reduced by 20.'],
            // Equipments
            [0, 5, 'CommandMissile', 'Disposable Missile Launcher', 'attack', 'missile', 'Fire a swarm of 12 missiles that deal 12x300% damage.'],
            [2, 5, 'Fruit', 'Foreign Fruit', 'defense,heal', 'fruit', 'Instantly heal for 50% of your maximum health.'],
            [11, 5, 'Blackhole', 'Blackhole', 'offense,stack', 'blackhole', 'Fire a black hole that draws enemies within 30m into it\'s center.\nLast 10 seconds.'],
            [13, 5, 'CritOnUse', 'Ocular HUD', 'attack', 'hud', 'Gain +100% Critical Strike Chance for 8 seconds.'],
            [14, 5, 'DroneBackup', 'The Back-up', 'utility,locked', 'drone', 'Call 4 Strike Drones to fight for you.\nLast 25 seconds.', 'Repair 30 drones or turrets.'],
            [16, 5, 'BFG', 'Preon Accumulator', 'offense,locked', 'beam', 'Fires preon tendrils, zapping enemies within 35m up to 600% damage/second.\nOn contact, detonate in an enormous 20m explosion for 4000% damage.', 'Open the Timed Security Chest on Rallypoint Delta.'],
            [18, 5, 'Jetpack', 'Milky Chrisalis', 'utility,movespeed', 'larva', 'Sprout wings and fly for 15 seconds.\nGain +20% movement speed for the duration.'],
            [19, 5, 'Lightning', 'Royal Capacitor', 'offense,locked', 'lightning', 'Call down a lightning strike on a targeted monster, dealing 3000% damage and stunning nearby monsters.', 'Defeat the Teleporter bosses after activating 2 Shrines of the Moutain.'],
            [20, 5, 'GoldGat', 'The Crowdfunder', 'offense,troll,locked', 'gatling', 'Fires a continuous barrage that deals 100% damage per bullet.\nCosts $1 per bullet. Costs increases over time.', 'Collect $30,480 total gold.'],
            [21, 5, 'PassiveHealing', 'Gnarled Woodsprite', 'defense,heal,locked', 'spirit', 'Gain a Woodsprite follower that heals for 1.5% of your maximum health/second.\nCan be sent to an ally to heal them for 10% of their maximum health.', 'Fully upgrade a Shrine of the Woods.'],
            [25, 5, 'Scanner', 'Radar Scanner', 'utility,scan,locked', 'radar', 'Reveal all interactables within 500m for 10 seconds.', 'Collect 10 Monster or Environment Logs.'],
        ];
        let itemObjects = [];
        let rarities = ['common', 'uncommon', 'rare', 'unique', 'lunar', 'equipment'];
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
            let container = document.createElement('div');
            container.className = 'column is-half-desktop is-full-touch';
            currentItem.node = container;
            let columns = document.createElement('div');
            columns.className = 'columns is-mobile is-marginless ror-item';
            if (currentItem.rarity > 0) {
                columns.classList.add(rarities[currentItem.rarity]);
            }
            let imgContainer = document.createElement('div');
            imgContainer.className = 'column is-paddingless is-narrow';
            let itemImageSrc = ['img/', currentItem.img, '.png'].join('');
            let img = document.createElement('img');
            img.addEventListener('click', event => {
                navigator.clipboard.writeText(currentItem.id)
                .then(() => {
                    SimpleNotification.success('Copied', ['**', currentItem.name, '** ID has been copied.'].join(''), itemImageSrc, {duration: 1000, position: 'bottom-left'});
                })
                .catch(error => {
                    SimpleNotification.error('Error', ['Could not copy the item ID:\n', error].join(''), itemImageSrc, {duration: 1000, position: 'bottom-left'});
                });

            });
            img.src = itemImageSrc;
            let descriptionContainer = document.createElement('div');
            descriptionContainer.className = 'column is-paddingless ror-item-description';
            let titleContainer = document.createElement('div');
            titleContainer.className = 'columns is-mobile is-marginless is-vcentered';
            let title = document.createElement('h1');
            title.className = 'column is-paddingless title is-marginless';
            title.textContent = currentItem.name;
            let id = document.createElement('span');
            id.className = 'is-vcenter is-hidden-mobile';
            id.textContent = ['#', currentItem.id].join('');
            let description = document.createElement('p');
            replacePerStack(description, currentItem.description);
            if (currentItem.info !== undefined) {
                let info = document.createElement('div');
                info.className = "notification is-info";
                info.textContent = ['Unlock: ', currentItem.info].join('');
                currentItem.info = info;
            }
            // Append
            imgContainer.appendChild(img);
            titleContainer.appendChild(title);
            titleContainer.appendChild(id);
            descriptionContainer.appendChild(titleContainer);
            descriptionContainer.appendChild(description);
            if (currentItem.info !== undefined) {
                descriptionContainer.appendChild(currentItem.info);
            }
            columns.append(imgContainer);
            columns.append(descriptionContainer);
            container.appendChild(columns);
            itemList.appendChild(container);
            // Lower case for search
            currentItem.search = [rarities[currentItem.rarity], currentItem.name, currentItem.tags, currentItem.gameName, currentItem.description].join(' ').toLowerCase();
            itemObjects.push(currentItem);
        }

        function replacePerStack(node, text) {
            // Normalize linebreak
            text = text.replace(/(\r?\n|\r)/gm, '\n');
            // Find tokens
            let specialNodes = [];
            let specialCount = 0;
            let lastTokenPos = 0;
            // Find strings that match tag
            let foundOpenPos, foundClosePos;
            while ((foundOpenPos = text.indexOf('{', lastTokenPos)) > -1) {
                foundOpenPos += 1; // Add the tag length to the found position
                // Find the closing tag
                if ((foundClosePos = text.indexOf('}', foundOpenPos)) > -1 && foundOpenPos != foundClosePos) {
                    let foundResult = text.substring(foundOpenPos, foundClosePos);
                    // Add the found tag to the list
                    specialNodes.push(foundResult);
                    // Replace the string by a token \id\
                    // Remove the tagLength from foundOpenPos to capture the tag
                    // Add the tagLength to foundClosePos to also capture the tag
                    let newText = text.substring(0, foundOpenPos - 1) + '\\' + specialCount + '\\' + text.substring(foundClosePos + 1);
                    text = newText;
                    specialCount++;
                }
                // Update lastTokenPos to reduce the string length to search
                lastTokenPos = foundOpenPos;
            }
            if (specialNodes.length > 0) {
                let parts = text.split(/\\(\d+)\\/);
                let lastPart = parts.length;
                for (let i = 0; i < lastPart; i++) {
                    // even index is simple text
                    if (i % 2 == 0) {
                        node.appendChild(document.createTextNode(parts[i]));
                    } else {
                        let perStack = document.createElement("span");
                        perStack.className = 'per-stack';
                        perStack.textContent = ['(', specialNodes[parseInt(parts[i])], ' per stack)'].join('');
                        node.appendChild(perStack);
                    }
                }
            } else {
                node.textContent = text;
            }
        }

        let itemObjectsCount = itemObjects.length;
        let noResult = document.getElementById('noResult');
        function search(query) {
            query = query.trim().toLowerCase();
            if (query == '') {
                itemList.querySelectorAll('.is-hidden').forEach(element => {
                    element.classList.remove('is-hidden');
                });
                noResult.classList.add('is-hidden');
                return;
            }
            let count = 0;
            for (let i = 0; i < itemObjectsCount; i++) {
                let item = itemObjects[i];
                if (item.search.indexOf(query) < 0) {
                    item.node.classList.add('is-hidden');
                } else {
                    count++;
                    item.node.classList.remove('is-hidden');
                }
            }
            if (count == 0) {
                noResult.classList.remove('is-hidden');
            } else {
                noResult.classList.add('is-hidden');
            }
        }

        document.getElementById('search').addEventListener('input', event => {
            search(event.target.value);
        });
        document.getElementById('form').addEventListener('submit', event => {
            event.preventDefault();
            search(event.target.query.value);
        });
        document.getElementById('form').addEventListener('reset', () => {
            search('');
        });
    } catch (error) {
        console.error(error);
    }
})();