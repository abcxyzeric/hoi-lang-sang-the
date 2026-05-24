/**
 * Mapping biến:
 * variables.Nhân_vật.Cấp_độ
 * variables.Nhân_vật.Tổng_kinh_nghiệm_hiện_tại
 * variables.Nhân_vật.Ngưỡng_lên_cấp
 * variables.Nhân_vật.Thuộc_tính.Điểm_thuộc_tính
 * variables.Nhân_vật.SP
 * variables.Nhân_vật.RP
 */

(function () {
    'use strict';

    // ==========================================
    // Công thức lõi
    // ==========================================

    function calculateDiabloThreshold(targetLevel) {
        if (targetLevel <= 1) return 0;
        let total = 0;
        for (let L = 1; L < targetLevel; L++) {
            total += Math.floor(100 * Math.pow(L, 1.5));
        }
        return total;
    }

    // ==========================================
    // Hàm công cụ
    // ==========================================

    function safeParseInt(value, def = 0) {
        const n = parseInt(value, 10);
        return isNaN(n) ? def : n;
    }

    function safeParseFloat(value, def = 0) {
        const n = parseFloat(value);
        return isNaN(n) ? def : n;
    }

    function getLevelBaseTotalExp(level) {
        const lv = Math.max(1, safeParseInt(level, 1));
        return calculateDiabloThreshold(lv);
    }

    function isBondShareExpEnabled(bond) {
        if (!bond || typeof bond !== 'object') return false;
        const shareExp = bond.Chia_sẻ_kinh_nghiệm;
        return shareExp !== false &&
            shareExp !== 'Không' &&
            shareExp !== 'false' &&
            shareExp !== 0 &&
            shareExp !== '0';
    }

    /**
     * Phán đoán hai giá trị có khác biệt hay không(dùng để phát hiện thay đổi)
     * Với object thì so sánh bằng JSON serialize, với kiểu cơ bản thì so sánh trực tiếp ===
     */
    function hasChanged(oldVal, newVal) {
        if (oldVal === newVal) return false;
        if (typeof oldVal === 'object' && typeof newVal === 'object') {
            return JSON.stringify(oldVal) !== JSON.stringify(newVal);
        }
        return true;
    }

    // Chỉ kiểm tra quy tắc với sáu thuộc tính của trang bị (theo Quy tắc sinh trang bị và vật phẩm)
    const CORE_ATTR_KEYS = ['Sức_mạnh', 'Nhanh_nhẹn', 'Thể_chất', 'Trí_lực', 'Cảm_nhận', 'Sức_hấp_dẫn'];
    const CORE_ATTR_KEY_SET = new Set(CORE_ATTR_KEYS);
    const CORE_ATTR_ALIAS = {
        'Thể_chất': 'Thể_chất',
    };
    const QUALITY_CORE_ATTR_RULES = {
        'Thường': { total: 0, single: 0 },
        'Tinh_lương': { total: 1, single: 1 },
        'Hiếm': { total: 1, single: 1 },
        'Thần_khí': { total: 2, single: 1 },
        'Truyền_thuyết': { total: 2, single: 2 },
        'Sử_thi': { total: 3, single: 2 },
        'Thần_thoại': { total: 4, single: 3 }
    };
    const QUALITY_CRIT_DAMAGE_LIMITS = {
        'Thường': 0.10,
        'Tinh_lương': 0.15,
        'Hiếm': 0.30,
        'Thần_khí': 0.50,
        'Truyền_thuyết': 0.80,
        'Sử_thi': 1.00,
        'Thần_thoại': 1.50
    };
    const QUALITY_ARMOR_CRIT_TO_SKILL_RULES = {
        'Hiếm': { pick: ['Cơ_bản', 'Nâng_cao', 'Tất_sát'], count: 1, value: 1 },
        'Thần_khí': { pick: ['Cơ_bản', 'Chuyển_nghề', 'Nâng_cao', 'Tất_sát', 'Áo_nghĩa'], count: 1, value: 1 },
        'Truyền_thuyết': { pick: ['Cơ_bản', 'Chuyển_nghề', 'Nâng_cao', 'Tất_sát', 'Áo_nghĩa'], count: 2, value: 1 },
        'Sử_thi': { fixed: { 'Toàn_kỹ_năng': 2 } },
        'Thần_thoại': { fixed: { 'Toàn_kỹ_năng': 2, 'Thức_tỉnh_ba': 1 } }
    };
    const CRIT_TO_SKILL_FALLBACK_TIERS = ['Cơ_bản', 'Chuyển_nghề', 'Nâng_cao', 'Tất_sát', 'Áo_nghĩa'];
    const SPECIAL_EQUIP_SLOT = 'Trang_bị_đặc_biệt';
    const STANDARD_EQUIP_SLOTS = new Set(['Tay_chính', 'Tay_phụ', 'Giáp_vai', 'Áo', 'Đai_lưng', 'Quần', 'Giày', 'Dây_chuyền', 'Vòng_tay', 'Nhẫn']);
    const TITAN_GRIP_TRAIT_NAME = 'Nắm_giữ_Titan';
    const DUAL_ARMAMENT_TRAIT_NAME = 'Vũ_trang_lưỡng_cực';

    function getEquipStoredSlot(equipData) {
        return String(equipData?.Vị_trí_trang_bị || '').trim();
    }

    function getEquipOriginSlot(equipData) {
        return String(equipData?.Vị_trí_trang_bị_gốc || equipData?.Vị_trí_trang_bị || '').trim();
    }

    function getEquipType(equipData) {
        return String(equipData?.Loại || '').trim();
    }

    function isStandardEquipSlot(slotName) {
        return STANDARD_EQUIP_SLOTS.has(String(slotName || '').trim());
    }

    function shouldUseSpecialEquipSlot(equipData) {
        const storedSlot = getEquipStoredSlot(equipData);
        if (isStandardEquipSlot(storedSlot)) return false;
        const originSlot = getEquipOriginSlot(equipData);
        return !!originSlot && !isStandardEquipSlot(originSlot);
    }

    function resolveEquipTargetSlot(equipData) {
        return shouldUseSpecialEquipSlot(equipData) ? SPECIAL_EQUIP_SLOT : getEquipStoredSlot(equipData);
    }

    function isSpecialEquippedItem(equipData) {
        return !!equipData && !equipData.Hòm_trang_bị && resolveEquipTargetSlot(equipData) === SPECIAL_EQUIP_SLOT;
    }

    function isShieldLikeEquip(equipData) {
        const equipType = getEquipType(equipData);
        const storedSlot = getEquipStoredSlot(equipData);
        const originSlot = getEquipOriginSlot(equipData);
        return equipType === 'Khiên' || storedSlot === 'Khiên' || originSlot === 'Khiên';
    }

    function getTraitNameSet(player) {
        return new Set(Object.keys(player?.Đặc_chất || {}).map(name => String(name || '').trim()));
    }

    function getOffhandRuleState(player) {
        const traitSet = getTraitNameSet(player);
        const hasTitanGrip = String(player?.Chủng_tộc || '').trim() === 'Cự_nhân_chủng' || traitSet.has(TITAN_GRIP_TRAIT_NAME);
        const hasDualArmament = traitSet.has(DUAL_ARMAMENT_TRAIT_NAME);
        return {
            hasTitanGrip,
            hasDualArmament,
            canUseOffhandWeapon: hasTitanGrip || hasDualArmament,
            canUseOffhandShield: hasDualArmament,
            hasSynergy: hasTitanGrip && hasDualArmament
        };
    }

    function normalizeCoreAttrKey(rawKey) {
        if (typeof rawKey !== 'string') return '';
        const key = rawKey.trim();
        return CORE_ATTR_ALIAS[key] || key;
    }

    function stableHash(text) {
        const seedText = String(text || '');
        let seed = 0;
        for (let i = 0; i < seedText.length; i++) {
            seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
        }
        return seed;
    }

    function stableRandomDecimal(seedText, max, decimals = 2) {
        const cap = Math.max(0, safeParseFloat(max, 0));
        if (cap <= 0) return 0;
        const fraction = (stableHash(seedText) % 1000000) / 999999;
        const factor = Math.pow(10, decimals);
        return Math.round(fraction * cap * factor) / factor;
    }

    function stablePickList(options, count, seedText) {
        if (!Array.isArray(options) || options.length === 0 || count <= 0) return [];
        const start = stableHash(seedText) % options.length;
        const out = [];
        for (let i = 0; i < options.length && out.length < count; i++) {
            out.push(options[(start + i) % options.length]);
        }
        return out;
    }

    function sanitizeNewEquipCoreAttrBonuses(equipKey, equipVal) {
        if (!equipVal || typeof equipVal !== 'object') return;
        const bonuses = equipVal.Cộng_thêm_thuộc_tính;
        if (!bonuses || typeof bonuses !== 'object' || Array.isArray(bonuses)) return;

        const quality = (typeof equipVal.Phẩm_chất === 'string' && equipVal.Phẩm_chất.trim()) ? equipVal.Phẩm_chất.trim() : 'Thường';
        const hasKnownQuality = Object.prototype.hasOwnProperty.call(QUALITY_CORE_ATTR_RULES, quality);
        const qualityRule = hasKnownQuality ? QUALITY_CORE_ATTR_RULES[quality] : QUALITY_CORE_ATTR_RULES['Thường'];
        const totalLimit = safeParseInt(qualityRule.total, 0);
        const singleLimit = safeParseInt(qualityRule.single, 0);

        const otherEntries = [];
        const coreOrder = [];
        const coreAccum = {};
        const aliasFixes = [];

        Object.entries(bonuses).forEach(([rawKey, rawVal]) => {
            const fixedKey = normalizeCoreAttrKey(rawKey);
            if (!CORE_ATTR_KEY_SET.has(fixedKey)) {
                otherEntries.push([rawKey, rawVal]);
                return;
            }

            if (fixedKey !== rawKey) {
                aliasFixes.push(`${rawKey}→${fixedKey}`);
            }

            // Cộng thêm sáu thuộc tính xử lý theo số nguyên, số âm và giá trị không hợp lệ được dọn thành 0
            const parsed = safeParseFloat(rawVal, 0);
            const positiveInt = Math.max(0, Math.floor(parsed));
            if (positiveInt <= 0) return;

            if (!Object.prototype.hasOwnProperty.call(coreAccum, fixedKey)) {
                coreAccum[fixedKey] = 0;
                coreOrder.push(fixedKey);
            }
            coreAccum[fixedKey] += positiveInt;
        });

        // Trước hết áp dụng giới hạn từng thuộc tính, sau đó áp dụng giới hạn tổng điểm sáu thuộc tính
        const singleCapped = [];
        const cappedEntries = coreOrder.map(key => {
            const raw = safeParseInt(coreAccum[key], 0);
            const capped = clamp(raw, 0, singleLimit);
            if (capped < raw) {
                singleCapped.push(`${key}:${raw}→${capped}`);
            }
            return { key, value: capped };
        }).filter(entry => entry.value > 0);

        // Giới hạn nghiêm tổng sáu thuộc tính không vượt điểm phẩm chất, giữ theo thứ tự xuất hiện
        let remain = totalLimit;
        const limitedEntries = [];
        const totalTrimmed = [];
        for (const entry of cappedEntries) {
            if (remain <= 0) {
                totalTrimmed.push(`${entry.key}:${entry.value}→0`);
                continue;
            }
            const keep = Math.min(entry.value, remain);
            if (keep < entry.value) {
                totalTrimmed.push(`${entry.key}:${entry.value}→${keep}`);
            }
            if (keep > 0) {
                limitedEntries.push({ key: entry.key, value: keep });
                remain -= keep;
            }
        }

        // Gộp key trùng(ví dụ"Thể_chất+Thể_chất"sau chuẩn hóa thành cùng key)
        const mergedByKey = [];
        for (const entry of limitedEntries) {
            const idx = mergedByKey.findIndex(x => x.key === entry.key);
            if (idx < 0) {
                mergedByKey.push({ key: entry.key, value: entry.value });
            } else {
                mergedByKey[idx].value = clamp(mergedByKey[idx].value + entry.value, 0, singleLimit);
            }
        }

        // Sau khi cắt nếu thấp hơn tổng điểm sáu thuộc tính mà phẩm chất cần có, bù vào thuộc tính khác chưa đạt giới hạn đơn mục.
        // ví dụThần_khíyêu cầu tổng điểm2,giới hạn đơn mục1,Nhanh_nhẹn+2 sẽ được sửa thành Nhanh_nhẹn+1,và bù 1 điểm vào thuộc tính khác.
        const refillAdded = [];
        const getMergedEntry = (key) => mergedByKey.find(x => x.key === key);
        const addRefillPoint = (key) => {
            const entry = getMergedEntry(key);
            if (entry) {
                if (entry.value >= singleLimit) return false;
                entry.value += 1;
            } else {
                mergedByKey.push({ key, value: 1 });
            }
            refillAdded.push(key);
            return true;
        };

        let coreTotal = mergedByKey.reduce((sum, x) => sum + x.value, 0);
        if (totalLimit > 0 && singleLimit > 0 && coreTotal < totalLimit) {
            const seedText = `${equipKey}|${equipVal.Tên || ''}|${quality}`;
            const seed = stableHash(seedText);
            const rotatedAttrs = CORE_ATTR_KEYS.map((_, idx) => CORE_ATTR_KEYS[(idx + seed) % CORE_ATTR_KEYS.length]);
            const fillOrder = [...new Set([...coreOrder, ...rotatedAttrs])];
            let guard = CORE_ATTR_KEYS.length * Math.max(1, singleLimit);
            while (coreTotal < totalLimit && guard-- > 0) {
                let filled = false;
                for (const key of fillOrder) {
                    if (coreTotal >= totalLimit) break;
                    if (addRefillPoint(key)) {
                        coreTotal += 1;
                        filled = true;
                    }
                }
                if (!filled) break;
            }
        }

        const equipType = getEquipType(equipVal);
        const canKeepCritDamage = equipType === 'Vũ_khí' || equipType === 'Trang_sức';
        const isArmorLike = equipType === 'Phòng_cụ' || isShieldLikeEquip(equipVal);
        const critDamageFixes = [];
        const critDamageConversions = [];
        const illegalCritDamageRemoved = [];
        const addOtherEntry = (entries, key, value) => {
            const existing = entries.find(entry => entry[0] === key);
            if (existing) {
                const oldVal = safeParseFloat(existing[1], 0);
                const addVal = safeParseFloat(value, 0);
                existing[1] = Math.round((oldVal + addVal) * 100) / 100;
            } else {
                entries.push([key, value]);
            }
        };
        const getOtherValue = (entries, key) => {
            const existing = entries.find(entry => entry[0] === key);
            return existing ? safeParseFloat(existing[1], 0) : 0;
        };
        const isNonStackingSkillKey = (skillKey) => skillKey === 'Toàn_kỹ_năng' || String(skillKey || '').startsWith('Thức_tỉnh');
        const addConvertedSkillEntry = (entries, skillKey, value, seedText) => {
            const addValue = safeParseFloat(value, 0);
            if (addValue <= 0) return false;

            let targetKey = skillKey;
            if (isNonStackingSkillKey(skillKey) && getOtherValue(entries, skillKey) > 0) {
                const fallbackOrder = stablePickList(CRIT_TO_SKILL_FALLBACK_TIERS, CRIT_TO_SKILL_FALLBACK_TIERS.length, seedText);
                targetKey = fallbackOrder.find(candidate => candidate !== skillKey) || CRIT_TO_SKILL_FALLBACK_TIERS[0];
            }

            addOtherEntry(entries, targetKey, addValue);
            critDamageConversions.push(`${targetKey}+${Math.round(addValue * 100) / 100}`);
            return true;
        };
        const sanitizedOtherEntries = [];
        otherEntries.forEach(([key, rawVal]) => {
            if (key !== 'Sát_thương_bạo_kích') {
                addOtherEntry(sanitizedOtherEntries, key, rawVal);
                return;
            }

            if (!canKeepCritDamage) {
                if (isArmorLike) {
                    const rule = QUALITY_ARMOR_CRIT_TO_SKILL_RULES[quality];
                    if (rule?.fixed) {
                        Object.entries(rule.fixed).forEach(([skillKey, value]) => {
                            addConvertedSkillEntry(sanitizedOtherEntries, skillKey, value, `${equipKey}|${equipVal.Tên || ''}|${quality}|${skillKey}|Sát_thương_bạo_kíchchuyển kỹ năng`);
                        });
                    } else if (rule?.pick) {
                        const targetCount = rule.count || 1;
                        const targetValue = rule.value || 1;
                        stablePickList(rule.pick, targetCount, `${equipKey}|${equipVal.Tên || ''}|${quality}|Sát_thương_bạo_kíchchuyển kỹ năng`).forEach(skillKey => {
                            addConvertedSkillEntry(sanitizedOtherEntries, skillKey, targetValue, `${equipKey}|${equipVal.Tên || ''}|${quality}|${skillKey}|Sát_thương_bạo_kíchchuyển kỹ năng`);
                        });
                    } else {
                        illegalCritDamageRemoved.push(`${equipType || 'loại chưa biết'}:${quality}`);
                    }
                } else {
                    illegalCritDamageRemoved.push(`${equipType || 'loại chưa biết'}:${quality}`);
                }
                return;
            }

            const cap = QUALITY_CRIT_DAMAGE_LIMITS[quality] ?? QUALITY_CRIT_DAMAGE_LIMITS['Thường'];
            const parsed = safeParseFloat(rawVal, 0);
            let normalized = parsed > 1 ? parsed / 100 : parsed;
            normalized = Math.max(0, normalized);
            let nextVal = normalized;
            if (normalized > cap) {
                nextVal = stableRandomDecimal(`${equipKey}|${equipVal.Tên || ''}|${quality}|Sát_thương_bạo_kích`, cap, 2);
                critDamageFixes.push(`${parsed}→${nextVal}`);
            } else if (parsed !== normalized) {
                critDamageFixes.push(`${parsed}→${normalized}`);
            }
            if (nextVal > 0) {
                addOtherEntry(sanitizedOtherEntries, key, nextVal);
            }
        });

        const sanitizedBonuses = {};
        sanitizedOtherEntries.forEach(([k, v]) => { sanitizedBonuses[k] = v; });
        mergedByKey.forEach(({ key, value }) => {
            if (value > 0) sanitizedBonuses[key] = value;
        });

        if (!hasChanged(bonuses, sanitizedBonuses)) return;

        equipVal.Cộng_thêm_thuộc_tính = sanitizedBonuses;

        if (!hasKnownQuality) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" Phẩm_chất="${quality}" không khớp quy tắc, xử lý như Thường(điểm sáu thuộc tính=0, giới hạn đơn mục=0)`);
        }
        if (aliasFixes.length > 0) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" sửa bí danh thuộc tính: ${aliasFixes.join(', ')}`);
        }
        if (singleCapped.length > 0) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" giới hạn một thuộc tính(${singleLimit})cắt ngưỡng: ${singleCapped.join(', ')}`);
        }
        if (totalTrimmed.length > 0) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" giới hạn điểm sáu thuộc tính(${totalLimit})cắt ngưỡng: ${totalTrimmed.join(', ')}`);
        }
        if (refillAdded.length > 0) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" điểm sáu thuộc tính thiếu, đã bù đủ: ${refillAdded.join(', ')}`);
        }
        if (critDamageFixes.length > 0) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" Sát_thương_bạo_kíchvượt giới hạn phẩm chất, đã sửa: ${critDamageFixes.join(', ')}`);
        }
        if (critDamageConversions.length > 0) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" Phòng_cụkhông cho phép sát thương bạo kích, đã chuyển thành cấp kỹ năng: ${critDamageConversions.join(', ')}`);
        }
        if (illegalCritDamageRemoved.length > 0) {
            console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" loại/phẩm chất hiện tại không có cấp kỹ năng thay thế, sát thương bạo kích đã bị xóa: ${illegalCritDamageRemoved.join(', ')}`);
        }
        console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" sáu thuộc tính đã được sửa: Phẩm_chất=${quality}, giới hạn điểm sáu thuộc tính=${totalLimit}, giới hạn một thuộc tính=${singleLimit}, tổng sau khi sửa=${coreTotal}`);
    }

    // ==========================================
    // AC Tính toán
    // ==========================================

    const qualityToAC = {
        'Thường': 1, 'Tinh_lương': 2, 'Hiếm': 3, 'Thần_khí': 4,
        'Truyền_thuyết': 5, 'Sử_thi': 6, 'Thần_thoại': 7
    };

    const qualityToDamageDice = {
        'Thường': '1d6', 'Tinh_lương': '1d8', 'Hiếm': '2d8', 'Thần_khí': '3d10',
        'Truyền_thuyết': '3d12', 'Sử_thi': '4d10', 'Thần_thoại': '4d12'
    };

    // ==========================================
    // Nắm_giữ_Titan - Xúc_xắc_sát_thươngTính toán hợp nhất
    // ==========================================

    const diceExpectation = {
        '1d4': 2.5, '1d6': 3.5, '1d8': 4.5, '1d10': 5.5, '1d12': 6.5,
        '2d6': 7, '2d8': 9, '2d10': 11, '2d12': 13,
        '3d6': 10.5, '3d8': 13.5, '3d10': 16.5, '3d12': 19.5,
        '4d6': 14, '4d8': 18, '4d10': 22, '4d12': 26,
        '5d10': 27.5, '5d12': 32.5,
        '6d10': 33, '6d12': 39
    };

    const sortedDice = Object.entries(diceExpectation).sort((a, b) => a[1] - b[1]);

    const diceDowngradeMap = {
        '4d12': '4d10', '4d10': '3d12', '3d12': '3d10', '3d10': '2d8',
        '2d8': '1d8', '1d8': '1d6', '1d6': '1d4', '1d4': '1d4'
    };
    const diceUpgradeMap = {
        '1d4': '1d6', '1d6': '1d8', '1d8': '2d8', '2d8': '3d10',
        '3d10': '3d12', '3d12': '4d10', '4d10': '4d12', '4d12': '4d12'
    };

    function downgradeDice(dice, levels = 2) {
        let result = dice;
        for (let i = 0; i < levels; i++) {
            result = diceDowngradeMap[result] || result;
        }
        return result;
    }

    function upgradeDice(dice, levels = 1) {
        let result = dice;
        for (let i = 0; i < levels; i++) {
            result = diceUpgradeMap[result] || result;
        }
        return result;
    }

    function findClosestDice(expectation) {
        let closest = '1d4';
        let minDiff = Infinity;
        for (const [dice, exp] of sortedDice) {
            const diff = Math.abs(exp - expectation);
            if (diff < minDiff) {
                minDiff = diff;
                closest = dice;
            }
        }
        return closest;
    }

    function mergeMainOffhandDice(mainDice, offhandDice, offhandDowngradeLevels = 2) {
        const mainExp = diceExpectation[mainDice] || 3.5;
        const downgradedOffhand = downgradeDice(offhandDice, offhandDowngradeLevels);
        const offExp = diceExpectation[downgradedOffhand] || 2.5;
        const totalExp = mainExp + offExp;
        const mergedDice = findClosestDice(totalExp);
        console.log(`[Tay_phụHợp nhất] chính ${mainDice}(${mainExp}) + phụ ${offhandDice}→${downgradedOffhand}(${offExp}) = ${totalExp} ≈ ${mergedDice}`);
        return mergedDice;
    }

    const qualityMultiplier = {
        'Thường': 1.0, 'Tinh_lương': 1.5, 'Hiếm': 2.0, 'Thần_khí': 2.5,
        'Truyền_thuyết': 3.5, 'Sử_thi': 4.0, 'Thần_thoại': 5.0
    };

    const armorSlotCoef = { 'Áo': 1.5, 'Quần': 1.3, 'Giáp_vai': 1.1, 'Giày': 1.1, 'Đai_lưng': 1.0, 'Khiên': 1.5 };
    const accessorySlotCoef = { 'Dây_chuyền': 4.0, 'Vòng_tay': 3.0, 'Nhẫn': 3.0 };
    const DAMAGE_REDUCTION_CAP = 75;
    const DAMAGE_REDUCTION_ALPHA = 16;
    const DAMAGE_REDUCTION_LOG_DEN = Math.log(1 + DAMAGE_REDUCTION_ALPHA); // ln(17)
    const PHYS_DEF_FULL_SCALE = 3300; // 100giá trị lý thuyết 5 món phòng cụ Thần_thoại cấp 100 +10 đầy đủ
    const MAG_DEF_FULL_SCALE = 5500;  // 100giá trị lý thuyết 3 món trang sức Thần_thoại cấp 100 +10 đầy đủ

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function defenseToReductionPercent(totalDefense, fullScaleDefense) {
        const defense = Math.max(0, safeParseFloat(totalDefense, 0));
        const scale = fullScaleDefense > 0 ? (defense / fullScaleDefense) : 0;
        const raw = DAMAGE_REDUCTION_CAP * Math.log(1 + DAMAGE_REDUCTION_ALPHA * scale) / DAMAGE_REDUCTION_LOG_DEN;
        return clamp(Math.round(raw), 0, DAMAGE_REDUCTION_CAP);
    }

    function calculateAC(variables) {
        const player = variables.Nhân_vật;
        if (!player) return;

        if (player.Chủng_tộc === 'Long_tinh_chủng') {
            const currentAC = safeParseInt(player.AC, 0);
            if (currentAC < 18) {
                player.AC = 18;
                console.log(`[AC tính toán] Long_tinh_chủngACmức sàn: ${currentAC} → 18`);
            }
            return;
        }

        const Danh_sách_trang_bị = player.Danh_sách_trang_bị || {};
        let Cộng_thêm_AC_cao_nhất = 0;
        Object.values(Danh_sách_trang_bị).forEach(item => {
            if (!item || !item.Tên || item.Hòm_trang_bị || isSpecialEquippedItem(item)) return;
            if (item.Loại !== 'Phòng_cụ' && !isShieldLikeEquip(item)) return;
            const bonus = qualityToAC[item.Phẩm_chất] || 0;
            if (bonus > Cộng_thêm_AC_cao_nhất) Cộng_thêm_AC_cao_nhất = bonus;
        });

        const newAC = 10 + Cộng_thêm_AC_cao_nhất;
        if (player.AC !== newAC) {
            console.log(`[AC tính toán] cập nhật AC: ${player.AC} → ${newAC}`);
            player.AC = newAC;
        }
    }

    // ==========================================
    // Thuộc_tính_chiến_đấuTính toán
    // ==========================================
    function calculateCombatStats(player) {
        if (!player.Thuộc_tính_chiến_đấu) return;
        const combat = player.Thuộc_tính_chiến_đấu;
        const rate = safeParseFloat(combat.Tỷ_lệ_bạo_kích, 0);
        let offset = Math.floor(rate / 10);
        if (offset < 0) offset = 0;
        if (offset > 10) offset = 10;
        const computedThreshold = 10 - offset;

        if (combat.Ngưỡng_bạo_kích !== computedThreshold) {
            console.log(`[Chiến_đấuTính toán] Ngưỡng_bạo_kích: ${combat.Ngưỡng_bạo_kích} → ${computedThreshold} (Tỷ_lệ_bạo_kích${rate}%)`);
            combat.Ngưỡng_bạo_kích = computedThreshold;
        }
    }

    // ==========================================
    // Giới_hạn_sinh_mệnhTính toán
    // ==========================================
    function calculateMaxHP(player) {
        if (!player.Thuộc_tính) return;

        const Cấp_độ = safeParseInt(player.Cấp_độ, 1);
        const Thể_chất = safeParseInt(player.Thuộc_tính.Thể_chất, 10);
        const Chủng_tộc = player.Chủng_tộc || '';

        let equipHpBonus = 0;
        const Danh_sách_trang_bị = player.Danh_sách_trang_bị || {};
        Object.values(Danh_sách_trang_bị).forEach(item => {
            if (!item || !item.Tên || item.Hòm_trang_bị) return;
            const bonuses = item.Cộng_thêm_thuộc_tính || {};
            equipHpBonus += safeParseInt(bonuses['Giới_hạn_sinh_mệnh'], 0);
        });

        let newMaxHP;
        if (Chủng_tộc === 'Cự_nhân_chủng') {
            newMaxHP = Cấp_độ * Thể_chất * 3 + equipHpBonus;
        } else {
            newMaxHP = Cấp_độ * Thể_chất * 2 + equipHpBonus;
        }
        newMaxHP = Math.max(newMaxHP, 1);

        if (player.Giới_hạn_sinh_mệnh !== newMaxHP) {
            const oldMaxHP = player.Giới_hạn_sinh_mệnh || 0;
            const oldCurrentHP = safeParseInt(player.Sinh_mệnh_hiện_tại, 0);
            player.Giới_hạn_sinh_mệnh = newMaxHP;
            console.log(`[HPTính toán] Giới_hạn_sinh_mệnh ${oldMaxHP} → ${newMaxHP}`);

            if (oldMaxHP > 0 && oldCurrentHP > 0) {
                const hpRatio = oldCurrentHP / oldMaxHP;
                const newCurrentHP = Math.max(1, Math.round(hpRatio * newMaxHP));
                player.Sinh_mệnh_hiện_tại = Math.min(newCurrentHP, newMaxHP);
                console.log(`[HPTính toán] sửa theo tỷ lệ: ${oldCurrentHP} → ${player.Sinh_mệnh_hiện_tại} (${Math.round(hpRatio * 100)}%)`);
            } else if (oldCurrentHP > newMaxHP) {
                player.Sinh_mệnh_hiện_tại = newMaxHP;
            }
        }
    }

    // ==========================================
    // Tự động tính trị số trang bị
    // ==========================================

    function generateRandomGrade() {
        return Math.floor(Math.random() * 21) - 10;
    }

    function ensureGrade(item) {
        console.log(`[Debug hạng phẩm] "${item.Tên}" vào ensureGrade, hạng phẩm hiện tại=${item.Hạng_phẩm}, Loại=${typeof item.Hạng_phẩm}`);
        
        const currentGrade = safeParseInt(item.Hạng_phẩm, null);
        
        // Trường hợp 1:hạng phẩm thiếu hoặc bằng 0,sinh hạng phẩm ngẫu nhiên
        if (currentGrade === null || currentGrade === 0) {
            const newGrade = generateRandomGrade();
            console.log(`[Debug hạng phẩm] "${item.Tên}" hạng phẩm thiếu hoặc bằng 0, sinh hạng phẩm ngẫu nhiên ${newGrade}`);
            item.Hạng_phẩm = newGrade;
            console.log(`[Debug hạng phẩm] "${item.Tên}" hạng phẩm sau gán=${item.Hạng_phẩm}`);
            return;
        }
        
        // Trường hợp 2:hạng phẩm vượt phạm vi [-10, 10],sửa về biên
        if (currentGrade < -10) {
            console.log(`[Sửa hạng phẩm] "${item.Tên}" hạng phẩm quá thấp(${currentGrade}),đã sửa thành -10`);
            item.Hạng_phẩm = -10;
        } else if (currentGrade > 10) {
            console.log(`[Sửa hạng phẩm] "${item.Tên}" hạng phẩm quá cao(${currentGrade}),đã sửa thành 10`);
            item.Hạng_phẩm = 10;
        }
    }

    function getCurrentWorldView(variables) {
        return String(variables?.Cấu_hình_hệ_thống?.Thế_giới_quan || '').trim();
    }

    function isAmberSwordWorldView(variables) {
        return getCurrentWorldView(variables) === 'Thanh_kiếm_Hổ_Phách';
    }

    function getWeaponCalcLevel(weapon, player, variables) {
        if (isAmberSwordWorldView(variables)) {
            return safeParseInt(player?.Cấp_độ, 1);
        }
        return safeParseInt(weapon?.Cấp_độ, 1);
    }

    function calculateWeaponStats(weapon, player, variables) {
        if (!weapon || !weapon.Tên) return false;
        ensureGrade(weapon);

        const Phẩm_chất = weapon.Phẩm_chất || 'Thường';
        const Cấp_độ = getWeaponCalcLevel(weapon, player, variables);
        const Hạng_phẩm = safeParseInt(weapon.Hạng_phẩm, 0);
        const Cấp_cường_hóa = safeParseInt(weapon.Cấp_cường_hóa, 0);

        const newDamageDice = qualityToDamageDice[Phẩm_chất] || '1d6';
        const newLevelCoef = Math.floor(Cấp_độ / 10) + 1;
        const gradeMultiplier = 1 + (Hạng_phẩm / 100);
        const enhanceMultiplier = 1 + (Cấp_cường_hóa * 0.1);
        const newFixedDmg = Math.max(1, Math.floor(Cấp_độ * enhanceMultiplier * gradeMultiplier));

        const changed = weapon.Xúc_xắc_sát_thương !== newDamageDice || weapon.Hệ_số_cấp_độ !== newLevelCoef || weapon.Sát_thương_cố_định !== newFixedDmg;
        weapon.Xúc_xắc_sát_thương = newDamageDice;
        weapon.Hệ_số_cấp_độ = newLevelCoef;
        weapon.Sát_thương_cố_định = newFixedDmg;

        if (changed) {
            console.log(`[Tính toán trang bị] Vũ_khí "${weapon.Tên}": ${newLevelCoef}×${newDamageDice}+${newFixedDmg}`);
        }
        return changed;
    }

    function collectEquippedCoreAttrBonuses(Danh_sách_trang_bị) {
        const out = {};
        CORE_ATTR_KEYS.forEach(k => { out[k] = 0; });
        Object.values(Danh_sách_trang_bị || {}).forEach(item => {
            if (!item || !item.Tên || item.Hòm_trang_bị) return;
            const bonuses = item.Cộng_thêm_thuộc_tính || {};
            CORE_ATTR_KEYS.forEach(k => {
                out[k] += safeParseInt(bonuses[k], 0);
            });
        });
        return out;
    }

    function ensureCombatAttrContainer(actor) {
        if (!actor || typeof actor !== 'object') return;
        if (!actor.Thuộc_tính_chiến_đấu || typeof actor.Thuộc_tính_chiến_đấu !== 'object') actor.Thuộc_tính_chiến_đấu = {};
        const combat = actor.Thuộc_tính_chiến_đấu;
        if (combat.Tỷ_lệ_bạo_kích === undefined) combat.Tỷ_lệ_bạo_kích = 0;
        if (combat.Sát_thương_bạo_kích === undefined) combat.Sát_thương_bạo_kích = 1.5;
        if (combat.Ngưỡng_bạo_kích === undefined) combat.Ngưỡng_bạo_kích = 10;
        if (combat.Giảm_sát_thương_vật_lý === undefined) combat.Giảm_sát_thương_vật_lý = 0;
        if (combat.Giảm_sát_thương_ma_pháp === undefined) combat.Giảm_sát_thương_ma_pháp = 0;
    }

    function hasActorCoreAttrChanged(actor, actorBefore) {
        if (!actor?.Thuộc_tính && !actorBefore?.Thuộc_tính) return false;
        return CORE_ATTR_KEYS.some(attrName =>
            safeParseInt(actor?.Thuộc_tính?.[attrName], 10) !== safeParseInt(actorBefore?.Thuộc_tính?.[attrName], 10)
        );
    }

    // Sau khi trang bị thay đổi, đồng bộ sáu thuộc tính thành giá trị bảng cuối cùng (gồm Thể_chất)
    function syncCoreAttrsOnEquipChange(actor, actorBefore, actorName = 'vai trò') {
        if (!actor?.Thuộc_tính || !actorBefore?.Thuộc_tính) return;
        const prevBonuses = collectEquippedCoreAttrBonuses(actorBefore.Danh_sách_trang_bị || {});
        const newBonuses = collectEquippedCoreAttrBonuses(actor.Danh_sách_trang_bị || {});
        const syncAttrs = ['Sức_mạnh', 'Nhanh_nhẹn', 'Thể_chất', 'Trí_lực', 'Cảm_nhận', 'Sức_hấp_dẫn'];
        syncAttrs.forEach(attrName => {
            const beforeVal = safeParseInt(actorBefore.Thuộc_tính?.[attrName], 10);
            const prevBonus = safeParseInt(prevBonuses[attrName], 0);
            const newBonus = safeParseInt(newBonuses[attrName], 0);
            const baseVal = beforeVal - prevBonus;
            const nextVal = baseVal + newBonus;
            const currentVal = safeParseInt(actor.Thuộc_tính?.[attrName], 10);
            if (currentVal !== nextVal) {
                actor.Thuộc_tính[attrName] = nextVal;
                console.log(`[Thuộc_tínhđồng bộ] ${actorName} ${attrName}: ${currentVal} → ${nextVal} (cộng thêm trang bị ${prevBonus} → ${newBonus})`);
            }
        });
    }

    function buildWeaponAttrSnapshot(actor) {
        const raw = actor?.Thuộc_tính || {};
        const snapshot = {};
        CORE_ATTR_KEYS.forEach(attrName => {
            snapshot[attrName] = safeParseInt(raw[attrName], 10);
        });
        return snapshot;
    }

    function calcAttrFixedDmg(Thuộc_tính, Nhân_vậtCấp_độ) {
        let maxVal = 0;
        CORE_ATTR_KEYS.forEach(attrName => {
            const v = safeParseInt(Thuộc_tính?.[attrName], 10);
            if (v > maxVal) maxVal = v;
        });
        const capped = Math.min(maxVal, 40);
        const modifier = capped > 10 ? Math.floor((capped - 10) / 2) : 0;
        const levelCoef = Math.floor(safeParseInt(Nhân_vậtCấp_độ, 1) / 10) + 1;
        return modifier * levelCoef;
    }

    function buildUnarmedWeaponPanel(actor) {
        const level = safeParseInt(actor?.Cấp_độ, 1);
        const levelCoef = Math.floor(level / 10) + 1;
        const baseFixed = Math.max(1, level);
        const attrSnapshot = buildWeaponAttrSnapshot(actor);
        const attrFixedDmg = calcAttrFixedDmg(attrSnapshot, level);
        return {
            Xúc_xắc_sát_thương: '1d4',
            Hệ_số_cấp_độ: levelCoef,
            Sát_thương_cố_định: baseFixed + attrFixedDmg
        };
    }

    function getArmorDefenseValue(armor, slotName) {
        if (!armor || !armor.Tên) return 0;
        const Phẩm_chất = armor.Phẩm_chất || 'Thường';
        const Cấp_độ = safeParseInt(armor.Cấp_độ, 1);
        const Hạng_phẩm = safeParseInt(armor.Hạng_phẩm, 0);
        const slotCoef = armorSlotCoef[slotName] || 1.0;
        const qualityMult = qualityMultiplier[Phẩm_chất] || 1.0;
        const gradeMultiplier = 1 + (Hạng_phẩm / 100);
        return Math.floor(Cấp_độ * slotCoef * qualityMult * gradeMultiplier);
    }

    function getAccessoryDefenseValue(accessory, slotName) {
        if (!accessory || !accessory.Tên) return 0;
        const Phẩm_chất = accessory.Phẩm_chất || 'Thường';
        const Cấp_độ = safeParseInt(accessory.Cấp_độ, 1);
        const Hạng_phẩm = safeParseInt(accessory.Hạng_phẩm, 0);
        const slotCoef = accessorySlotCoef[slotName] || 3.0;
        const qualityMult = qualityMultiplier[Phẩm_chất] || 1.0;
        const gradeMultiplier = 1 + (Hạng_phẩm / 100);
        return Math.floor(Cấp_độ * slotCoef * qualityMult * gradeMultiplier);
    }

    function calculateArmorStats(armor, slotName) {
        if (!armor || !armor.Tên) return false;
        ensureGrade(armor);
        const newDefense = getArmorDefenseValue(armor, slotName);

        if (armor.Lực_phòng_ngự !== newDefense) {
            armor.Lực_phòng_ngự = newDefense;
            console.log(`[Tính toán trang bị] Phòng_cụ "${armor.Tên}" (${slotName}): Lực_phòng_ngự=${newDefense}`);
            return true;
        }
        return false;
    }

    function calculateAccessoryStats(accessory, slotName) {
        if (!accessory || !accessory.Tên) return false;
        ensureGrade(accessory);
        const newDefense = getAccessoryDefenseValue(accessory, slotName);

        if (accessory.Lực_phòng_ngự !== newDefense) {
            accessory.Lực_phòng_ngự = newDefense;
            console.log(`[Tính toán trang bị] Trang_sức "${accessory.Tên}" (${slotName}): Lực_phòng_ngự=${newDefense}`);
            return true;
        }
        return false;
    }

    /**
     * Tính toàn bộ trị số trang bị (bản dùng Danh_sách_trang_bị thống nhất)
     * @param {object} variables - stat_data
     * @param {object|null} variablesBefore - stat_data (before),dùng để phán đoán trang bị có thay đổi hay không
     */
    function calculateEquipmentStatsForActor(actor, variables, actorName = 'vai trò') {
        if (!actor) {
            console.log(`[Debug tính toán trang bị] ${actorName}không tồn tại, bỏ qua`);
            return;
        }
        const Danh_sách_trang_bị = actor.Danh_sách_trang_bị;
        const offhandRule = getOffhandRuleState(actor);
        console.log(`[Debug tính toán trang bị] Danh_sách_trang_bị=${Danh_sách_trang_bị}, Loại=${typeof Danh_sách_trang_bị}, keys=${Danh_sách_trang_bị ? Object.keys(Danh_sách_trang_bị) : 'N/A'}`);
        if (!Danh_sách_trang_bị) { console.log('[Debug tính toán trang bị] Danh_sách_trang_bịkhông tồn tại, bỏ qua'); return; }

        let mainWeapon = null;
        let offWeapon = null;

        Object.entries(Danh_sách_trang_bị).forEach(([key, item]) => {
            if (!item || !item.Tên) return;
            const isEquipped = !item.Hòm_trang_bị;
            const isSpecialEquipped = isSpecialEquippedItem(item);
            const slotName = getEquipStoredSlot(item);

            if (item.Loại === 'Vũ_khí') {
                if (!(isEquipped && isSpecialEquipped)) {
                    calculateWeaponStats(item, actor, variables);
                }
                if (isEquipped && !isSpecialEquipped) {
                    if (slotName === 'Tay_chính') mainWeapon = item;
                    if (slotName === 'Tay_phụ' && offhandRule.canUseOffhandWeapon) offWeapon = item;
                }
            } else if (item.Loại === 'Phòng_cụ' || isShieldLikeEquip(item)) {
                if (!(isEquipped && isSpecialEquipped)) {
                    const armorSlot = isShieldLikeEquip(item) ? 'Khiên' : (slotName || item.Vị_trí_trang_bị);
                    calculateArmorStats(item, armorSlot);
                }
            } else if (item.Loại === 'Trang_sức') {
                if (!(isEquipped && isSpecialEquipped)) {
                    calculateAccessoryStats(item, slotName || item.Vị_trí_trang_bị);
                }
            }
        });

        // Tay_phụHợp nhất:Nắm_giữ_Titan/Vũ_trang_lưỡng_cựccó hiệu lực thì hợp nhất vũ khí chính/phụ
        if (mainWeapon && offWeapon && offhandRule.canUseOffhandWeapon) {
            const mainDice = qualityToDamageDice[mainWeapon.Phẩm_chất] || '1d6';
            const offDice = qualityToDamageDice[offWeapon.Phẩm_chất] || '1d6';
            const mainDiceForMerge = offhandRule.hasSynergy ? upgradeDice(mainDice, 1) : mainDice;
            const offhandDowngradeLevels = offhandRule.hasSynergy ? 0 : 2;
            const mergedDice = mergeMainOffhandDice(mainDiceForMerge, offDice, offhandDowngradeLevels);

            if (mainWeapon.Xúc_xắc_sát_thương !== mergedDice) {
                mainWeapon.Xúc_xắc_sát_thương = mergedDice;
                console.log(`[Tay_phụHợp nhất] xúc xắc sát thương vũ khí chính cập nhật thành: ${mergedDice}`);
            }

            const mainFixedDmg = safeParseInt(mainWeapon.Sát_thương_cố_định, 0);
            const offFixedDmg = safeParseInt(offWeapon.Sát_thương_cố_định, 0);
            const mergedFixedDmg = mainFixedDmg + Math.floor(offFixedDmg / 2);
            if (mainWeapon.Sát_thương_cố_định !== mergedFixedDmg) {
                mainWeapon.Sát_thương_cố_định = mergedFixedDmg;
                console.log(`[Tay_phụHợp nhất] sát thương cố định vũ khí chính cập nhật thành: ${mergedFixedDmg}`);
            }
        }

        // sinh Bảng_vũ_khí
        if (mainWeapon) {
            const attrSnapshot = buildWeaponAttrSnapshot(actor);
            const attrFixedDmg = calcAttrFixedDmg(attrSnapshot, actor.Cấp_độ);
            const panelFixedDmg = safeParseInt(mainWeapon.Sát_thương_cố_định, 0) + attrFixedDmg;
            const newPanel = {
                Xúc_xắc_sát_thương: mainWeapon.Xúc_xắc_sát_thương || '',
                Hệ_số_cấp_độ: mainWeapon.Hệ_số_cấp_độ || 1,
                Sát_thương_cố_định: panelFixedDmg
            };
            ensureCombatAttrContainer(actor);
            if (!_.isEqual(actor.Thuộc_tính_chiến_đấu.Bảng_vũ_khí, newPanel)) {
                actor.Thuộc_tính_chiến_đấu.Bảng_vũ_khí = newPanel;
                console.log(`[Bảng_vũ_khí] ${actorName} đã cập nhật: ${newPanel.Hệ_số_cấp_độ}×${newPanel.Xúc_xắc_sát_thương}+${newPanel.Sát_thương_cố_định} (Vũ_khísát thương cố định${safeParseInt(mainWeapon.Sát_thương_cố_định, 0)} + Thuộc_tínhsát thương cố định${attrFixedDmg})`);
            }
        } else {
            ensureCombatAttrContainer(actor);
            const unarmedPanel = buildUnarmedWeaponPanel(actor);
            if (!_.isEqual(actor.Thuộc_tính_chiến_đấu.Bảng_vũ_khí, unarmedPanel)) {
                actor.Thuộc_tính_chiến_đấu.Bảng_vũ_khí = unarmedPanel;
                console.log(`[Bảng_vũ_khí] ${actorName} KhôngTay_chínhVũ_khí,đã ghi bảng vũ khí trống: ${unarmedPanel.Hệ_số_cấp_độ}×${unarmedPanel.Xúc_xắc_sát_thương}+${unarmedPanel.Sát_thương_cố_định}`);
            }
        }
    }

    function calculateAllEquipmentStats(variables) {
        const player = variables.Nhân_vật;
        if (!player) { console.log('[Debug tính toán trang bị] playerkhông tồn tại, bỏ qua'); return; }
        calculateEquipmentStatsForActor(player, variables, 'nhân vật chính');
    }

    // ==========================================
    // Kỹ_năngHồi_chiêuhệ thống quản lý(MVU bản biến)
    // ==========================================

    const DEFAULT_SKILL_SYSTEM_MODE = 'classic';
    const COMBO_STATE_DEFAULT = {
        Nhóm_cao_cấp_hiện_tại: 'alpha',
        Ô_hiển_thị_hiện_tại: 'advanced'
    };
    const COMBO_ADVANCED_GROUP_ORDER = ['alpha', 'beta', 'gamma'];
    const COMBO_GROUP_ORDER = [...COMBO_ADVANCED_GROUP_ORDER, 'ultimate'];
    const COMBO_GROUP_SLOT_RULES = {
        alpha: [['Nâng_cao'], ['Nâng_cao'], ['Tất_sát']],
        beta: [['Nâng_cao'], ['Nâng_cao'], ['Tất_sát']],
        gamma: [['Nâng_cao'], ['Nâng_cao'], ['Tất_sát']],
        ultimate: [['Áo_nghĩa'], ['Áo_nghĩa'], ['Áo_nghĩa']]
    };
    const COMBO_BASE_SLOT_RULES = [['Cơ_bản'], ['Cơ_bản'], ['Cơ_bản']];
    const COMBO_CLASS_SLOT_RULES = [['Chuyển_nghề'], ['Chuyển_nghề'], ['Chuyển_nghề']];
    const SKILL_TIER_KEYS = ['Cơ_bản', 'Chuyển_nghề', 'Nâng_cao', 'Tất_sát', 'Áo_nghĩa', 'Thức_tỉnh_một', 'Thức_tỉnh_hai', 'Thức_tỉnh_ba'];
    const ALL_SKILL_TIERS = ['Cơ_bản', 'Chuyển_nghề', 'Nâng_cao', 'Tất_sát', 'Áo_nghĩa'];
    const TIER_CONFIG = {
        Cơ_bản: { Hồi_chiêu: 0, Sát_thương: { Cơ_bản: 150, Tăng_trưởng: 15 } },
        Chuyển_nghề: { Hồi_chiêu: 0, Sát_thương: { Cơ_bản: 210, Tăng_trưởng: 35 } },
        Nâng_cao: { Hồi_chiêu: 1, Sát_thương: { Cơ_bản: 420, Tăng_trưởng: 70 } },
        Tất_sát: { Hồi_chiêu: 2, Sát_thương: { Cơ_bản: 980, Tăng_trưởng: 90 } },
        Áo_nghĩa: { Hồi_chiêu: 3, Sát_thương: { Cơ_bản: 1680, Tăng_trưởng: 140 } },
        Thức_tỉnh_một: { Hồi_chiêu: 3, Sát_thương: { Cơ_bản: 3150, Tăng_trưởng: 350 } },
        Thức_tỉnh_hai: { Hồi_chiêu: 4, Sát_thương: { Cơ_bản: 4200, Tăng_trưởng: 700 } },
        Thức_tỉnh_ba: { Hồi_chiêu: 5, Sát_thương: { Cơ_bản: 5600, Tăng_trưởng: 0 } }
    };
    const DAMAGE_VERSION = 4;
    const LEGACY_SUMMON_CONFIG = {
        Cơ_bản: { Cơ_bản: 110, Tăng_trưởng: 10 },
        Chuyển_nghề: { Cơ_bản: 150, Tăng_trưởng: 25 },
        Nâng_cao: { Cơ_bản: 210, Tăng_trưởng: 35 },
        Tất_sát: { Cơ_bản: 350, Tăng_trưởng: 30 },
        Áo_nghĩa: { Cơ_bản: 420, Tăng_trưởng: 45 }
    };
    const SUMMON_DAMAGE_RATIO_BY_TIER = {
        Cơ_bản: 1.0,
        Chuyển_nghề: 1.0,
        Nâng_cao: 0.8,
        Tất_sát: 0.65,
        Áo_nghĩa: 0.5
    };

    function collectSkillTierEquipBonuses(Danh_sách_trang_bị) {
        const totals = {};
        Object.values(Danh_sách_trang_bị || {}).forEach(eq => {
            if (!eq || !eq.Tên || eq.Hòm_trang_bị) return;
            const bonus = eq.Cộng_thêm_thuộc_tính || {};
            Object.entries(bonus).forEach(([key, val]) => {
                const parsed = safeParseFloat(val, 0);
                if (parsed === 0) return;
                if (key === 'Toàn_kỹ_năng') {
                    ALL_SKILL_TIERS.forEach(tier => {
                        totals[tier] = safeParseFloat(totals[tier], 0) + parsed;
                    });
                    return;
                }
                if (!SKILL_TIER_KEYS.includes(key)) return;
                totals[key] = safeParseFloat(totals[key], 0) + parsed;
            });
        });
        return totals;
    }

    function getLegacySummonDamageRatioByCooldown(cooldown = 0) {
        if (cooldown <= 0) return 1;
        return Math.max(0.5, 0.8 - cooldown * 0.1);
    }

    function getSummonDamageRatioByTier(tierName = '') {
        return SUMMON_DAMAGE_RATIO_BY_TIER[tierName] ?? 0.5;
    }

    function getSkillBaseDamage(skill) {
        const tier = TIER_CONFIG[skill?.Bậc_kỹ_năng];
        if (!tier) return 0;
        if (skill?.Loại === 'Đặc_biệt' || skill?.Loại === 'Đặc_biệt_nghề_nghiệp') return 0;
        const level = safeParseInt(skill?.Cấp_hiện_tại, 0);
        if (level <= 0) return 0;

        const activeBase = tier.Sát_thương.Cơ_bản + tier.Sát_thương.Tăng_trưởng * (level - 1);
        if (skill?.Loại !== 'Triệu_hồi') {
            return activeBase;
        }

        const ratio = getSummonDamageRatioByTier(skill?.Bậc_kỹ_năng);
        return Math.round(activeBase * ratio);
    }

    function getLegacySummonBaseDamage(skill) {
        if (skill?.Loại !== 'Triệu_hồi') {
            return getSkillBaseDamage(skill);
        }
        const legacy = LEGACY_SUMMON_CONFIG[skill?.Bậc_kỹ_năng];
        const level = safeParseInt(skill?.Cấp_hiện_tại, 0);
        if (!legacy || level <= 0) return 0;
        return legacy.Cơ_bản + legacy.Tăng_trưởng * (level - 1);
    }

    function getSummonBaseDamageByVersion(skill, damageVersion = 0) {
        if (skill?.Loại !== 'Triệu_hồi') {
            return getSkillBaseDamage(skill);
        }

        const parsedVersion = Number(damageVersion || 0);
        if (parsedVersion >= 2) {
            const tier = TIER_CONFIG[skill?.Bậc_kỹ_năng];
            if (!tier) return 0;
            const level = safeParseInt(skill?.Cấp_hiện_tại, 0);
            if (level <= 0) return 0;
            const activeBase = tier.Sát_thương.Cơ_bản + tier.Sát_thương.Tăng_trưởng * (level - 1);
            const ratio = getLegacySummonDamageRatioByCooldown(tier.Hồi_chiêu || 0);
            return Math.round(activeBase * ratio);
        }

        return getLegacySummonBaseDamage(skill);
    }

    function calcSkillDamage(skill) {
        const base = getSkillBaseDamage(skill);
        if (base <= 0) return 0;
        const floatRatio = 1 - Math.random() * 0.10;
        return Math.round(base * floatRatio / 10) * 10;
    }

    function getSkillBaseDamageByVersion(skill, level, damageVersion = DAMAGE_VERSION) {
        const normalizedLevel = Math.max(1, safeParseInt(level, 1));
        if (skill?.Loại === 'Triệu_hồi') {
            return getSummonBaseDamageByVersion({ ...skill, Cấp_hiện_tại: normalizedLevel }, damageVersion);
        }
        return getSkillBaseDamage({ ...skill, Cấp_hiện_tại: normalizedLevel });
    }

    function calcFixedSkillDamageStep(skill, currentDmg, currentLevel, damageVersion = DAMAGE_VERSION) {
        if (!skill || skill.Loại === 'Đặc_biệt' || skill.Loại === 'Đặc_biệt_nghề_nghiệp') return 0;

        const normalizedLevel = Math.max(1, safeParseInt(currentLevel, 1));
        const currentBase = getSkillBaseDamageByVersion(skill, normalizedLevel, damageVersion);
        const nextBase = getSkillBaseDamageByVersion(skill, normalizedLevel + 1, damageVersion);
        const rawGrowth = Math.max(0, nextBase - currentBase);
        if (rawGrowth <= 0 || !Number.isFinite(currentDmg) || currentDmg <= 0 || currentBase <= 0) {
            return 0;
        }

        const floatRatio = currentDmg / currentBase;
        const fixedStep = Math.floor((rawGrowth * floatRatio) / 10) * 10;
        return Math.max(10, fixedStep);
    }

    function getSkillCurrentLevel(skill) {
        const lv = Number(skill?.Cấp_hiện_tại ?? skill?.Cấp_kỹ_năng ?? 0);
        if (!Number.isFinite(lv)) return 0;
        return Math.max(0, Math.floor(lv));
    }

    function resolveSpecialEffectEntry(specialEffect, currentLevel) {
        if (!specialEffect) return null;
        const lv = Math.max(1, Math.floor(Number(currentLevel) || 1));

        if (typeof specialEffect === 'string') {
            const text = specialEffect.trim();
            if (!text) return null;
            return { key: String(lv), value: text };
        }

        if (typeof specialEffect !== 'object' || Array.isArray(specialEffect)) return null;

        const exactKey = String(lv);
        if (typeof specialEffect[exactKey] === 'string' && specialEffect[exactKey].trim()) {
            return { key: exactKey, value: specialEffect[exactKey] };
        }

        const numericKeys = Object.keys(specialEffect)
            .map(key => safeParseInt(key, NaN))
            .filter(key => Number.isFinite(key))
            .sort((a, b) => a - b);

        if (numericKeys.length > 0) {
            const lowerOrEqual = numericKeys.filter(key => key <= lv);
            if (lowerOrEqual.length > 0) {
                const nearest = String(lowerOrEqual[lowerOrEqual.length - 1]);
                const val = specialEffect[nearest];
                if (typeof val === 'string' && val.trim()) {
                    return { key: nearest, value: val };
                }
            }

            const smallest = String(numericKeys[0]);
            const smallestVal = specialEffect[smallest];
            if (typeof smallestVal === 'string' && smallestVal.trim()) {
                return { key: smallest, value: smallestVal };
            }
        }

        if (typeof specialEffect['Không'] === 'string' && specialEffect['Không'].trim()) {
            return { key: 'Không', value: specialEffect['Không'] };
        }

        return null;
    }

    function getSpecialEffectObj(skill) {
        const currentLevel = getSkillCurrentLevel(skill);
        if (currentLevel === 0) return { '1': 'Không' };

        if (typeof skill?.Hiệu_ứng_đặc_biệt === 'string') {
            const text = String(skill.Hiệu_ứng_đặc_biệt || '').trim();
            return { '1': text || 'Không' };
        }

        const resolved = resolveSpecialEffectEntry(skill?.Hiệu_ứng_đặc_biệt, currentLevel);
        if (!resolved) return { '1': 'Không' };
        const resolvedKey = String(resolved.key || '').trim();
        const resolvedVal = String(resolved.value || '').trim() || 'Không';
        if (!/^\d+$/.test(resolvedKey)) return { '1': resolvedVal };
        return { [resolvedKey]: resolvedVal };
    }

    function getEffectiveSkillLevel(skill, equipBonuses = {}) {
        const baseLevel = safeParseInt(skill?.Cấp_hiện_tại, 0);
        if (baseLevel <= 0) return 0;
        const tier = skill?.Bậc_kỹ_năng || '';
        const tierBonus = safeParseInt(equipBonuses[tier], 0);
        const effectiveLevel = baseLevel + tierBonus;
        if (tier.includes('Thức_tỉnh')) {
            return Math.min(effectiveLevel, 3);
        }
        return effectiveLevel;
    }

    function resolveComboSlotDamageState(skill, existingSlot, level) {
        if (!skill || skill.Loại === 'Đặc_biệt' || skill.Loại === 'Đặc_biệt_nghề_nghiệp') {
            return {
                Hệ_số_sát_thương: 0,
                Giá_trị_tăng_trưởng_sát_thương: 0,
                Phiên_bản_hệ_số_sát_thương: DAMAGE_VERSION
            };
        }

        const normalizedLevel = Math.max(1, safeParseInt(level, 1));
        const previousLevel = Math.max(1, safeParseInt(existingSlot?.Cấp_kỹ_năng, normalizedLevel));
        const previousDamage = safeParseFloat(existingSlot?.Hệ_số_sát_thương, 0);
        const previousVersion = safeParseInt(existingSlot?.Phiên_bản_hệ_số_sát_thương, DAMAGE_VERSION);

        if (previousDamage > 0) {
            const needsMigration = previousVersion !== DAMAGE_VERSION
                || !Number.isFinite(Number(existingSlot?.Giá_trị_tăng_trưởng_sát_thương));
            let damageStep = Number(existingSlot?.Giá_trị_tăng_trưởng_sát_thương);
            if (!Number.isFinite(damageStep) || damageStep < 0 || needsMigration) {
                damageStep = calcFixedSkillDamageStep(
                    skill,
                    previousDamage,
                    previousLevel,
                    previousVersion || DAMAGE_VERSION
                );
            }
            const levelDiff = normalizedLevel - previousLevel;
            return {
                Hệ_số_sát_thương: levelDiff === 0 ? previousDamage : Math.max(0, previousDamage + damageStep * levelDiff),
                Giá_trị_tăng_trưởng_sát_thương: damageStep,
                Phiên_bản_hệ_số_sát_thương: DAMAGE_VERSION
            };
        }

        const initialDamage = calcSkillDamage({ ...skill, Cấp_hiện_tại: normalizedLevel });
        return {
            Hệ_số_sát_thương: initialDamage,
            Giá_trị_tăng_trưởng_sát_thương: calcFixedSkillDamageStep(skill, initialDamage, normalizedLevel, DAMAGE_VERSION),
            Phiên_bản_hệ_số_sát_thương: DAMAGE_VERSION
        };
    }

    function normalizeSkillSystemMode(mode) {
        return mode === 'combo' ? 'combo' : DEFAULT_SKILL_SYSTEM_MODE;
    }

    function getSkillSystemMode(statData) {
        return normalizeSkillSystemMode(statData?.Cấu_hình_hệ_thống?.Chế_độ_hệ_thống_kỹ_năng);
    }

    function createFixedSlotArray(values, size = 3) {
        return Array.from({ length: size }, (_, index) => (values && values[index]) || '');
    }

    function getComboSkillState(statData) {
        const raw = statData?.Cấu_hình_hệ_thống?.Trạng_thái_kỹ_năng_tổ_hợp || {};
        return {
            Nhóm_cao_cấp_hiện_tại: COMBO_ADVANCED_GROUP_ORDER.includes(raw.Nhóm_cao_cấp_hiện_tại) ? raw.Nhóm_cao_cấp_hiện_tại : COMBO_STATE_DEFAULT.Nhóm_cao_cấp_hiện_tại,
            Ô_hiển_thị_hiện_tại: raw.Ô_hiển_thị_hiện_tại === 'ultimate' ? 'ultimate' : COMBO_STATE_DEFAULT.Ô_hiển_thị_hiện_tại,
            custom: raw.custom === true
        };
    }

    function getLearnedSkillNamesByTier(statData, tierName) {
        const Danh_sách_kỹ_năng = statData?.Nhân_vật?.Cây_kỹ_năng?.Danh_sách_kỹ_năng || {};
        return Object.entries(Danh_sách_kỹ_năng)
            .filter(([_, skill]) => skill?.Bậc_kỹ_năng === tierName && safeParseInt(skill?.Cấp_hiện_tại, 0) > 0)
            .map(([name]) => name);
    }

    function sanitizeComboSlotSkillName(skillList, skillName, allowedTiers) {
        if (!skillName) return '';
        const skill = skillList ? skillList[skillName] : null;
        if (!skill || safeParseInt(skill?.Cấp_hiện_tại, 0) <= 0) return '';
        if (Array.isArray(allowedTiers) && allowedTiers.length > 0 && !allowedTiers.includes(skill.Bậc_kỹ_năng)) return '';
        return skillName;
    }

    function normalizeComboSlotArray(skillList, rawSlots, slotRules) {
        return slotRules.map((allowedTiers, index) => sanitizeComboSlotSkillName(skillList, rawSlots ? rawSlots[index] : '', allowedTiers));
    }

    function getDefaultComboEquipState(statData) {
        const comboState = getComboSkillState(statData);
        const Cơ_bản = getLearnedSkillNamesByTier(statData, 'Cơ_bản');
        const Chuyển_nghề = getLearnedSkillNamesByTier(statData, 'Chuyển_nghề');
        const Nâng_cao = getLearnedSkillNamesByTier(statData, 'Nâng_cao');
        const Tất_sát = getLearnedSkillNamesByTier(statData, 'Tất_sát');
        const Áo_nghĩa = getLearnedSkillNamesByTier(statData, 'Áo_nghĩa');
        return {
            Nhóm_cao_cấp_hiện_tại: comboState.Nhóm_cao_cấp_hiện_tại,
            Ô_hiển_thị_hiện_tại: comboState.Ô_hiển_thị_hiện_tại,
            custom: comboState.custom === true,
            Ô_kỹ_năng_cơ_bản: createFixedSlotArray(Cơ_bản.slice(0, 3)),
            Ô_kỹ_năng_chuyển_nghề: createFixedSlotArray(Chuyển_nghề.slice(0, 3)),
            Cấu_hình_nhóm_kỹ_năng_cao_cấp: {
                alpha: createFixedSlotArray([Nâng_cao[0], Nâng_cao[1], Tất_sát[0]]),
                beta: createFixedSlotArray([Nâng_cao[1], Nâng_cao[2], Tất_sát[1]]),
                gamma: createFixedSlotArray([Nâng_cao[2], Nâng_cao[0], Tất_sát[2]]),
                ultimate: createFixedSlotArray(Áo_nghĩa.slice(0, 3))
            }
        };
    }

    function getComboEquipState(statData, stateOverride = null) {
        const skillList = statData?.Nhân_vật?.Cây_kỹ_năng?.Danh_sách_kỹ_năng || {};
        const rawState = statData?.Cấu_hình_hệ_thống?.Trạng_thái_kỹ_năng_tổ_hợp || {};
        const mergedState = stateOverride ? {
            ...rawState,
            ...stateOverride,
            Cấu_hình_nhóm_kỹ_năng_cao_cấp: {
                ...(rawState.Cấu_hình_nhóm_kỹ_năng_cao_cấp || {}),
                ...((stateOverride && stateOverride.Cấu_hình_nhóm_kỹ_năng_cao_cấp) || {})
            }
        } : rawState;
        const defaults = getDefaultComboEquipState(statData);
        const currentGroup = COMBO_ADVANCED_GROUP_ORDER.includes(mergedState.Nhóm_cao_cấp_hiện_tại)
            ? mergedState.Nhóm_cao_cấp_hiện_tại
            : defaults.Nhóm_cao_cấp_hiện_tại;
        return {
            Nhóm_cao_cấp_hiện_tại: currentGroup,
            Ô_hiển_thị_hiện_tại: mergedState.Ô_hiển_thị_hiện_tại === 'ultimate' ? 'ultimate' : defaults.Ô_hiển_thị_hiện_tại,
            custom: mergedState.custom === true,
            Ô_kỹ_năng_cơ_bản: normalizeComboSlotArray(skillList, mergedState.Ô_kỹ_năng_cơ_bản || defaults.Ô_kỹ_năng_cơ_bản, COMBO_BASE_SLOT_RULES),
            Ô_kỹ_năng_chuyển_nghề: normalizeComboSlotArray(skillList, mergedState.Ô_kỹ_năng_chuyển_nghề || defaults.Ô_kỹ_năng_chuyển_nghề, COMBO_CLASS_SLOT_RULES),
            Cấu_hình_nhóm_kỹ_năng_cao_cấp: {
                alpha: normalizeComboSlotArray(skillList, (mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp && mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp.alpha) || defaults.Cấu_hình_nhóm_kỹ_năng_cao_cấp.alpha, COMBO_GROUP_SLOT_RULES.alpha),
                beta: normalizeComboSlotArray(skillList, (mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp && mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp.beta) || defaults.Cấu_hình_nhóm_kỹ_năng_cao_cấp.beta, COMBO_GROUP_SLOT_RULES.beta),
                gamma: normalizeComboSlotArray(skillList, (mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp && mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp.gamma) || defaults.Cấu_hình_nhóm_kỹ_năng_cao_cấp.gamma, COMBO_GROUP_SLOT_RULES.gamma),
                ultimate: normalizeComboSlotArray(skillList, (mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp && mergedState.Cấu_hình_nhóm_kỹ_năng_cao_cấp.ultimate) || defaults.Cấu_hình_nhóm_kỹ_năng_cao_cấp.ultimate, COMBO_GROUP_SLOT_RULES.ultimate)
            }
        };
    }

    function ensureComboSkillState(statData) {
        if (!statData.Cấu_hình_hệ_thống) statData.Cấu_hình_hệ_thống = {};
        const next = getComboEquipState(statData);
        statData.Cấu_hình_hệ_thống.Trạng_thái_kỹ_năng_tổ_hợp = next;
        return next;
    }

    function getComboSlotPlan(statData, stateOverride = null) {
        const Danh_sách_kỹ_năng = statData?.Nhân_vật?.Cây_kỹ_năng?.Danh_sách_kỹ_năng || {};
        const state = getComboEquipState(statData, stateOverride);
        const toEntry = (skillName) => skillName ? [skillName, Danh_sách_kỹ_năng[skillName] || {}] : null;
        const advancedGroups = Object.fromEntries(COMBO_GROUP_ORDER.map((groupKey) => [
            groupKey,
            (state.Cấu_hình_nhóm_kỹ_năng_cao_cấp[groupKey] || []).map(toEntry).filter(Boolean)
        ]));
        const advancedSlots = advancedGroups[state.Nhóm_cao_cấp_hiện_tại] || [];
        const ultimateSlots = advancedGroups.ultimate || [];
        return {
            state,
            baseSlots: [...state.Ô_kỹ_năng_cơ_bản.map(toEntry), ...state.Ô_kỹ_năng_chuyển_nghề.map(toEntry)],
            advancedGroups,
            advancedSlots,
            ultimateSlots,
            displaySlots: state.Ô_hiển_thị_hiện_tại === 'ultimate' ? ultimateSlots : advancedSlots
        };
    }

    function buildComboSlotSkillData(skillName, skill, existingSlot, equipBonuses = {}) {
        const nextSlot = existingSlot ? { ...existingSlot } : {};
        const effectiveLevel = Math.max(1, getEffectiveSkillLevel(skill, equipBonuses) || safeParseInt(nextSlot.Cấp_kỹ_năng, 1));
        const damageState = resolveComboSlotDamageState(skill, existingSlot, effectiveLevel);
        nextSlot.Tên = skillName;
        nextSlot.Loại = skill?.Loại || nextSlot.Loại || 'Chủ_động';
        nextSlot.Cấp_kỹ_năng = effectiveLevel;
        nextSlot.Đang_hồi_chiêu = nextSlot.Đang_hồi_chiêu === true || safeParseInt(skill?.Bộ_đếm_hồi_chiêu, 0) > 0;
        nextSlot.Hệ_số_sát_thương = damageState.Hệ_số_sát_thương;
        nextSlot.Bậc_kỹ_năng = skill?.Bậc_kỹ_năng || nextSlot.Bậc_kỹ_năng || 'Cơ_bản';
        nextSlot.Mô_tả = skill?.Mô_tả || nextSlot.Mô_tả || '';
        nextSlot.Hiệu_ứng_đặc_biệt = getSpecialEffectObj({ ...skill, Cấp_hiện_tại: effectiveLevel });
        if (skill?.Tên_vật_triệu_hồi) nextSlot.Tên_vật_triệu_hồi = skill.Tên_vật_triệu_hồi;
        else if (nextSlot.Tên_vật_triệu_hồi) delete nextSlot.Tên_vật_triệu_hồi;
        delete nextSlot.Giá_trị_tăng_trưởng_sát_thương;
        delete nextSlot.Phiên_bản_hệ_số_sát_thương;
        return nextSlot;
    }

    function syncComboActiveSlots(statData) {
        if (getSkillSystemMode(statData) !== 'combo') return;
        const Nhân_vật = statData?.Nhân_vật;
        if (!Nhân_vật) return;
        const Danh_sách_kỹ_năng = Nhân_vật?.Cây_kỹ_năng?.Danh_sách_kỹ_năng || {};
        const currentSlots = Nhân_vật.Ô_kỹ_năng_chủ_động || {};
        const equipBonuses = collectSkillTierEquipBonuses(Nhân_vật?.Danh_sách_trang_bị || {});
        const plan = getComboSlotPlan(statData);
        const nextSlots = {};
        console.log(`[Chuyển tổ hợp] syncô trước currentKeys=[${Object.keys(currentSlots).join(', ')}] currentCooling=[${Object.entries(currentSlots).filter(([_, slot]) => slot?.Đang_hồi_chiêu === true).map(([name]) => name).join(', ')}]`);
        console.log(`[Chuyển tổ hợp] synckế hoạch ô base=[${plan.baseSlots.map(entry => entry?.[0] || '').join(', ')}] display=[${plan.displaySlots.map(entry => entry?.[0] || '').join(', ')}]`);
        [...plan.baseSlots, ...plan.displaySlots].forEach(entry => {
            if (!entry) return;
            const [skillName, skill] = entry;
            const treeSkill = Danh_sách_kỹ_năng[skillName] || skill;
            nextSlots[skillName] = buildComboSlotSkillData(skillName, treeSkill, currentSlots[skillName], equipBonuses);
        });
        console.log(`[Chuyển tổ hợp] syncứng viên sau nextKeys=[${Object.keys(nextSlots).join(', ')}] nextCooling=[${Object.entries(nextSlots).filter(([_, slot]) => slot?.Đang_hồi_chiêu === true).map(([name]) => name).join(', ')}]`);
        if (!_.isEqual(currentSlots, nextSlots)) {
            Nhân_vật.Ô_kỹ_năng_chủ_động = nextSlots;
            console.log(`[Chuyển tổ hợp] syncđã ghi vào Ô_kỹ_năng_chủ_động`);
        } else {
            console.log(`[Chuyển tổ hợp] syncKhôngkhông cần sửaÔ_kỹ_năng_chủ_động`);
        }
    }

    function clearComboActiveSlots(statData) {
        const Nhân_vật = statData?.Nhân_vật;
        if (!Nhân_vật) return;
        Nhân_vật.Ô_kỹ_năng_chủ_động = {};
        Nhân_vật.Ô_kỹ_năng_thức_tỉnh = {};
    }

    function handleComboBattleEntry(statData, statDataBefore) {
        if (getSkillSystemMode(statData) !== 'combo') return false;
        const Đang_trong_chiến_đấu = statData?.Chiến_đấu?.Đang_chiến_đấu === true;
        const Chiến_đấu_trước = statDataBefore?.Chiến_đấu?.Đang_chiến_đấu === true;
        if (!Đang_trong_chiến_đấu || Chiến_đấu_trước) return false;
        const currentState = ensureComboSkillState(statData);
        if (currentState.custom === true) {
            console.log('[Chuyển tổ hợp] custom=true,khi vào chiến đấu không reset nhóm cao cấp/ô hiển thị');
            return false;
        }
        currentState.Nhóm_cao_cấp_hiện_tại = 'alpha';
        currentState.Ô_hiển_thị_hiện_tại = 'advanced';
        return true;
    }

    function syncSkillSlotsByMode(statData, statDataBefore, opts = {}) {
        const { syncComboSlots = false } = opts;
        const Nhân_vật = statData?.Nhân_vật;
        if (!Nhân_vật) return;
        if (!Nhân_vật.Ô_kỹ_năng_chủ_động) Nhân_vật.Ô_kỹ_năng_chủ_động = {};
        if (!Nhân_vật.Ô_kỹ_năng_thức_tỉnh) Nhân_vật.Ô_kỹ_năng_thức_tỉnh = {};

        const currentMode = getSkillSystemMode(statData);
        const prevMode = getSkillSystemMode(statDataBefore || {});
        const comboState = currentMode === 'combo' ? ensureComboSkillState(statData) : null;
        const shouldSyncCustomComboSlots = currentMode === 'combo' && comboState?.custom === true;

        if (currentMode === 'combo') {
            if (syncComboSlots || shouldSyncCustomComboSlots) syncComboActiveSlots(statData);
            else if (prevMode !== 'combo') clearComboActiveSlots(statData);
            return;
        }

        if (prevMode === 'combo') {
            clearComboActiveSlots(statData);
        }
    }

    function collectComboRoundUsage(statData, statDataBefore) {
        if (getSkillSystemMode(statData) !== 'combo') return;
        const currentSlots = statData?.Nhân_vật?.Ô_kỹ_năng_chủ_động || {};
        const prevSlots = statDataBefore?.Nhân_vật?.Ô_kỹ_năng_chủ_động || {};
        const usedSet = new Set();
        Object.entries(currentSlots).forEach(([skillName, slot]) => {
            if (slot?.Đang_hồi_chiêu === true && prevSlots?.[skillName]?.Đang_hồi_chiêu !== true) {
                usedSet.add(skillName);
            }
        });
        console.log(`[Chuyển tổ hợp] phát hiện kỹ năng dùng trong hiệp này current=[${Object.entries(currentSlots).filter(([_, slot]) => slot?.Đang_hồi_chiêu === true).map(([name]) => name).join(', ')}] prev=[${Object.entries(prevSlots).filter(([_, slot]) => slot?.Đang_hồi_chiêu === true).map(([name]) => name).join(', ')}] used=[${Array.from(usedSet).join(', ')}]`);
        return Array.from(usedSet);
    }

    function advanceComboSkillState(statData, statDataBefore, roundUsedSkillNames = []) {
        if (getSkillSystemMode(statData) !== 'combo') return false;
        const currentState = ensureComboSkillState(statData);
        if (currentState.custom === true) {
            console.log('[Chuyển tổ hợp] custom=true,bỏ qua tự động chuyển bằng script phụ trợ');
            return false;
        }
        const prevGroup = currentState.Nhóm_cao_cấp_hiện_tại;
        const prevDisplay = currentState.Ô_hiển_thị_hiện_tại;
        const Đang_trong_chiến_đấu = statData?.Chiến_đấu?.Đang_chiến_đấu === true;
        console.log(`[Chuyển tổ hợp] bắt đầu tiến, đang chiến đấu=${Đang_trong_chiến_đấu} prevGroup=${prevGroup} prevDisplay=${prevDisplay} used=[${roundUsedSkillNames.join(', ')}]`);

        if (!Đang_trong_chiến_đấu) {
            currentState.Ô_hiển_thị_hiện_tại = 'advanced';
            console.log(`[Chuyển tổ hợp] không chiến đấu, reset ô hiển thị thành advanced`);
            return prevGroup !== currentState.Nhóm_cao_cấp_hiện_tại || prevDisplay !== currentState.Ô_hiển_thị_hiện_tại;
        }

        if (roundUsedSkillNames.length <= 0) {
            console.log(`[Chuyển tổ hợp] bỏ qua tiến trình: lần này không phát hiện kỹ năng mới vào hồi chiêu`);
            return false;
        }

        const finishedRoundState = {
            Nhóm_cao_cấp_hiện_tại: ['alpha', 'beta', 'gamma'].includes(currentState.Nhóm_cao_cấp_hiện_tại) ? currentState.Nhóm_cao_cấp_hiện_tại : 'alpha',
            Ô_hiển_thị_hiện_tại: currentState.Ô_hiển_thị_hiện_tại === 'ultimate' ? 'ultimate' : 'advanced'
        };
        const finishedRoundPlan = getComboSlotPlan(statData, finishedRoundState);
        const usedSet = new Set(roundUsedSkillNames);
        const baseNames = finishedRoundPlan.baseSlots.map(entry => entry?.[0] || '');
        const finishedRoundGroup = finishedRoundState.Nhóm_cao_cấp_hiện_tại;
        let targetGroup = finishedRoundGroup;
        console.log(`[Chuyển tổ hợp] Cơ_bản/Chuyển_nghềô baseNames=${JSON.stringify(baseNames)} finishedRoundGroup=${finishedRoundGroup}`);
        console.log(`[Chuyển tổ hợp] phán định kích hoạt alpha=${!!(baseNames[0] && baseNames[1] && usedSet.has(baseNames[0]) && usedSet.has(baseNames[1]))} beta=${!!(baseNames[2] && baseNames[3] && usedSet.has(baseNames[2]) && usedSet.has(baseNames[3]))} gamma=${!!(baseNames[4] && baseNames[5] && usedSet.has(baseNames[4]) && usedSet.has(baseNames[5]))}`);

        if (baseNames[0] && baseNames[1] && usedSet.has(baseNames[0]) && usedSet.has(baseNames[1])) targetGroup = 'alpha';
        else if (baseNames[2] && baseNames[3] && usedSet.has(baseNames[2]) && usedSet.has(baseNames[3])) targetGroup = 'beta';
        else if (baseNames[4] && baseNames[5] && usedSet.has(baseNames[4]) && usedSet.has(baseNames[5])) targetGroup = 'gamma';

        const targetAdvancedEntries = finishedRoundPlan.advancedGroups[targetGroup] || [];
        const hasConfiguredAdvancedGroup = targetAdvancedEntries.length > 0;
        currentState.Nhóm_cao_cấp_hiện_tại = hasConfiguredAdvancedGroup ? targetGroup : finishedRoundGroup;
        if (!hasConfiguredAdvancedGroup && targetGroup !== finishedRoundGroup) {
            console.log(`[Chuyển tổ hợp] nhóm cao cấp mục tiêu ${targetGroup} chưa cấu hình kỹ năng nào, giữ nhóm hiện tại ${finishedRoundGroup}`);
        }
        console.log(`[Chuyển tổ hợp] kết quả chuyển nhóm cao cấp nextGroup=${currentState.Nhóm_cao_cấp_hiện_tại}`);

        if (finishedRoundState.Ô_hiển_thị_hiện_tại === 'ultimate') {
            const ultimateEntries = finishedRoundPlan.ultimateSlots;
            const hasConfiguredUltimate = ultimateEntries.length > 0;
            const allUltimateCooling = hasConfiguredUltimate && ultimateEntries.every(([skillName]) => {
                const treeSkill = statData?.Nhân_vật?.Cây_kỹ_năng?.Danh_sách_kỹ_năng?.[skillName];
                const slotSkill = statData?.Nhân_vật?.Ô_kỹ_năng_chủ_động?.[skillName];
                return slotSkill?.Đang_hồi_chiêu === true || safeParseInt(treeSkill?.Bộ_đếm_hồi_chiêu, 0) > 0;
            });
            currentState.Ô_hiển_thị_hiện_tại = (!hasConfiguredUltimate || allUltimateCooling) ? 'advanced' : 'ultimate';
            console.log(`[Chuyển tổ hợp] Ô_hiển_thị_hiện_tạivốn là ultimate, hasConfiguredUltimate=${hasConfiguredUltimate} allUltimateCooling=${allUltimateCooling} -> nextDisplay=${currentState.Ô_hiển_thị_hiện_tại}`);
        } else {
            const finishedRoundAdvancedEntries = finishedRoundPlan.advancedGroups[currentState.Nhóm_cao_cấp_hiện_tại] || [];
            const justCoolingCount = finishedRoundAdvancedEntries.reduce((count, [skillName]) => {
                return count + (usedSet.has(skillName) ? 1 : 0);
            }, 0);
            const hasConfiguredUltimate = finishedRoundPlan.ultimateSlots.length > 0;
            const hasReadyUltimate = hasConfiguredUltimate && finishedRoundPlan.ultimateSlots.some(([skillName]) => {
                const treeSkill = statData?.Nhân_vật?.Cây_kỹ_năng?.Danh_sách_kỹ_năng?.[skillName];
                return safeParseInt(treeSkill?.Bộ_đếm_hồi_chiêu, 0) <= 0;
            });
            currentState.Ô_hiển_thị_hiện_tại = (justCoolingCount >= 2 && hasReadyUltimate) ? 'ultimate' : 'advanced';
            console.log(`[Chuyển tổ hợp] phán định nhóm kết thúc justCoolingCount=${justCoolingCount} hasConfiguredUltimate=${hasConfiguredUltimate} hasReadyUltimate=${hasReadyUltimate} -> nextDisplay=${currentState.Ô_hiển_thị_hiện_tại}`);
        }
        console.log(`[Chuyển tổ hợp] kết thúc tiến trình changed=${prevGroup !== currentState.Nhóm_cao_cấp_hiện_tại || prevDisplay !== currentState.Ô_hiển_thị_hiện_tại} finalGroup=${currentState.Nhóm_cao_cấp_hiện_tại} finalDisplay=${currentState.Ô_hiển_thị_hiện_tại}`);
        return prevGroup !== currentState.Nhóm_cao_cấp_hiện_tại || prevDisplay !== currentState.Ô_hiển_thị_hiện_tại;
    }

    // Bậc_kỹ_năng → Hồi_chiêumapping số lượt (Cơ_bản/Chuyển_nghề không hồi chiêu)
    const tierCooldownMap = {
        'Thức_tỉnh_ba': 5, 'Thức_tỉnh_hai': 4, 'Thức_tỉnh_một': 3,
        'Áo_nghĩa': 3, 'Tất_sát': 2, 'Nâng_cao': 1
    };

    function getAllSlotSkills(statData) {
        const Nhân_vật = statData?.Nhân_vật;
        if (!Nhân_vật) return {};
        return {
            ...(Nhân_vật.Ô_kỹ_năng_chủ_động || {}),
            ...(Nhân_vật.Ô_kỹ_năng_thức_tỉnh || {})
        };
    }

    function detectPhaseShift(statData, statDataBefore) {
        const newEffects = statData?.Nhân_vật?.Hiệu_ứng_trạng_thái || {};
        const oldEffects = statDataBefore?.Nhân_vật?.Hiệu_ứng_trạng_thái || {};

        for (const name of Object.keys(newEffects)) {
            if (name.includes('Chuyển_pha') && name.includes('Hồi_chiêu')) {
                if (!oldEffects[name] || JSON.stringify(oldEffects[name]) !== JSON.stringify(newEffects[name])) {
                    console.log(`[Hồi_chiêuhệ thống] phát hiện Chuyển_pha: "${name}"`);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * xử lý logic hồi chiêu kỹ năng (bản biến MVU)
     *
     * Quy tắc hồi chiêu: hiệp phóng thích không tính vào hồi chiêu.
     *   Ý nghĩa của Hồi_chiêu N: sau khi phóng thích cần chờ thêm N hiệp mới dùng được.
     *   ví dụ:Hồi_chiêu1(Nâng_cao) → sau hiệp phóng thích chờ 1 lượt là dùng được
     *       Hồi_chiêu2(Tất_sát) → sau hiệp phóng thích chờ 2 lượt là dùng được
     *       Hồi_chiêu3(Áo_nghĩa) → sau hiệp phóng thích chờ 3 lượt là dùng được
     *
     * Bộ_đếm_hồi_chiêu nằm trên Cây_kỹ_năng, biểu thị"số lượt còn cần chờ":
     *   khi vào hồi chiêu thì ghi vào tierCooldownMap[tier]
     *   mỗi lượt tiến -1, giảm tới 0 thì xóa Đang_hồi_chiêu
     *   hiệp phóng thích không đổi lượt nên sẽ không bị giảm
     */
    let _lastRound = -1;

    function handleSkillCooldowns(statData, statDataBefore) {
        const allSlotSkills = getAllSlotSkills(statData);
        const Danh_sách_kỹ_năng = statData?.Nhân_vật?.Cây_kỹ_năng?.Danh_sách_kỹ_năng || {};
        const Lượt_hiện_tại = statData?.Chiến_đấu?.Lượt_hiện_tại || 0;
        const Lượt_trước = statDataBefore?.Chiến_đấu?.Lượt_hiện_tại ?? _lastRound;

        // Không ghi log chẩn đoán vô điều kiện: chỉ xác nhận hàm được gọi khi cần.
        const slotNames = Object.keys(allSlotSkills);
        const coolingSkills = Object.entries(allSlotSkills)
            .filter(([_, s]) => s.Đang_hồi_chiêu === true)
            .map(([n]) => {
                const treeSkill = Danh_sách_kỹ_năng[n];
                return `${n}(${treeSkill?.Bộ_đếm_hồi_chiêu || 0})`;
            });
        console.log(`[Hồi_chiêuhệ thống] lượt=${Lượt_hiện_tại}(lần trước=${Lượt_trước}), _lastRound=${_lastRound}, Kỹ_năngô=${slotNames.length}cái, Đang_hồi_chiêu: [${coolingSkills.join(', ')}]`);

        // 1. lượt tiến -> kỹ năng đã có Bộ_đếm_hồi_chiêu giảm dần
        const justExpired = new Set(); // ghi lại kỹ năng vừa giảm về 0 trong khung này
        if (Lượt_hiện_tại > Lượt_trước && Lượt_trước >= 0) {
            const delta = Lượt_hiện_tại - Lượt_trước;
            for (const [name, treeSkill] of Object.entries(Danh_sách_kỹ_năng)) {
                if (treeSkill.Bộ_đếm_hồi_chiêu > 0) {
                    const before = treeSkill.Bộ_đếm_hồi_chiêu;
                    treeSkill.Bộ_đếm_hồi_chiêu = Math.max(0, treeSkill.Bộ_đếm_hồi_chiêu - delta);
                    console.log(`[Hồi_chiêuhệ thống] lượt tiến(+${delta}):"${name}"Bộ_đếm_hồi_chiêu ${before}→${treeSkill.Bộ_đếm_hồi_chiêu}`);
                    if (treeSkill.Bộ_đếm_hồi_chiêu <= 0) {
                        justExpired.add(name);
                    }
                }
            }
        }

        // 2. Chuyển_pha → bổ sung -1
        const phaseShift = detectPhaseShift(statData, statDataBefore);
        if (phaseShift) {
            for (const [name, treeSkill] of Object.entries(Danh_sách_kỹ_năng)) {
                if (treeSkill.Bộ_đếm_hồi_chiêu > 0) {
                    treeSkill.Bộ_đếm_hồi_chiêu = Math.max(0, treeSkill.Bộ_đếm_hồi_chiêu - 1);
                    console.log(`[Hồi_chiêuhệ thống] Chuyển_pha:"${name}"Bộ_đếm_hồi_chiêu→${treeSkill.Bộ_đếm_hồi_chiêu}`);
                    if (treeSkill.Bộ_đếm_hồi_chiêu <= 0) {
                        justExpired.add(name);
                    }
                }
            }
        }

        // 3. phát hiện mới vào hồi chiêu
        //    điều kiện: Đang_hồi_chiêu=true và Bộ_đếm_hồi_chiêu<=0 và không phải mục vừa giảm về 0 trong khung này (đó là hết hồi chiêu, không phải hồi chiêu mới)
        for (const [name, slotSkill] of Object.entries(allSlotSkills)) {
            if (slotSkill.Đang_hồi_chiêu !== true) continue;
            if (justExpired.has(name)) continue; // khung này vừa giảm về 0, là hết hồi chiêu chứ không phải hồi chiêu mới

            const treeSkill = Danh_sách_kỹ_năng[name];
            if (!treeSkill) continue;
            if (treeSkill.Bộ_đếm_hồi_chiêu > 0) continue; // đã đang đếm ngược

            const tier = slotSkill.Bậc_kỹ_năng || treeSkill.Bậc_kỹ_năng || 'Cơ_bản';
            const tierCD = tierCooldownMap[tier] || 0;
            if (tierCD <= 0) {
                // Cơ_bản/Chuyển_nghề:KhôngHồi_chiêu,hồi phục ngay
                slotSkill.Đang_hồi_chiêu = false;
                treeSkill.Bộ_đếm_hồi_chiêu = 0;
                console.log(`[Hồi_chiêuhệ thống] Kỹ_năng"${name}"Bậc_kỹ_năng=${tier},KhôngHồi_chiêu,hồi phục ngay`);
            } else {
                treeSkill.Bộ_đếm_hồi_chiêu = tierCD;
                console.log(`[Hồi_chiêuhệ thống] Kỹ_năng"${name}"vào hồi chiêu, bậc kỹ năng=${tier},số lượt chờ=${tierCD}`);
            }
        }

        // 4. Bộ_đếm_hồi_chiêuvề 0 -> khôi phục dùng được
        for (const [name, slotSkill] of Object.entries(allSlotSkills)) {
            const treeSkill = Danh_sách_kỹ_năng[name];
            if (slotSkill.Đang_hồi_chiêu === true && treeSkill && treeSkill.Bộ_đếm_hồi_chiêu <= 0) {
                slotSkill.Đang_hồi_chiêu = false;
                treeSkill.Bộ_đếm_hồi_chiêu = 0;
                console.log(`[Hồi_chiêuhệ thống] "${name}"Hồi_chiêukết thúc, đã khôi phục dùng được`);
            }
        }

        // 5. Chiến_đấukết thúc -> xóa sạch mọi hồi chiêu
        if (Lượt_hiện_tại === 0 && !statData?.Chiến_đấu?.Đang_chiến_đấu) {
            for (const [name, slotSkill] of Object.entries(allSlotSkills)) {
                if (slotSkill.Đang_hồi_chiêu === true) {
                    slotSkill.Đang_hồi_chiêu = false;
                }
            }
            for (const [name, treeSkill] of Object.entries(Danh_sách_kỹ_năng)) {
                if (treeSkill.Bộ_đếm_hồi_chiêu > 0) {
                    treeSkill.Bộ_đếm_hồi_chiêu = 0;
                    console.log(`[Hồi_chiêuhệ thống] Chiến_đấukết thúc:"${name}"Hồi_chiêuđã xóa sạch`);
                }
            }
        }

        _lastRound = Lượt_hiện_tại;
    }

    // ==========================================
    // Bảo vệ biến:chặn AI sửa trái phép trường được bảo vệ
    // ==========================================

    const PROTECTED_PATHS = [
        'Nhân_vật.Cấp_độ',
        'Nhân_vật.Ngưỡng_lên_cấp',
    ];

    function getByPath(obj, path) {
        return path.split('.').reduce((o, k) => o?.[k], obj);
    }

    function setByPath(obj, path, value) {
        const keys = path.split('.');
        let cur = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (cur[keys[i]] === undefined) return;
            cur = cur[keys[i]];
        }
        cur[keys[keys.length - 1]] = value;
    }

    const BOND_BRIEF_PATH_PREFIX = '/Danh_sách_ràng_buộc/';

    function clonePlainValue(value) {
        if (value === undefined) return undefined;
        if (typeof _ !== 'undefined' && _?.cloneDeep) return _.cloneDeep(value);
        return JSON.parse(JSON.stringify(value));
    }

    const STARTER_TEAMMATE_TEMPLATE_MAP = {
        'Pháp Lộ Đặc': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Ảo_tưởng_chủng',
            Cấp_độ: 95,
            Thuộc_tính: { Sức_mạnh: 28, Nhanh_nhẹn: 24, Thể_chất: 26, Trí_lực: 14, Cảm_nhận: 18, Sức_hấp_dẫn: 26 },
            Danh_sách_trang_bị: {
                'Hắc Ám Long Thương': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Hắc Ám Long Thương', Phẩm_chất: 'Sử_thi', Cấp_độ: 95, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Sức_mạnh: 10, Thể_chất: 5 },
                    Hiệu_quả: '[Bị động - Thiên Ân] Khi ở ngoài trời hoặc trên không, mọi kiểm định thuộc tính +2;[Bị động - Long Uy] Khi gây sát thương lên [Long tộc] hoặc [quái vật không phải huyền thoại], mục tiêu phải kiểm định ý chí, thất bại thì nhận [Run sợ](AC-2);[Tuyệt kỹ - Thương Rơi Sao] Chỉ dùng được khi đang bay hoặc ở nơi cao. Lao xuống hủy diệt, xúc xắc sát thương của đòn này nhân đôi. Nếu hạ gục mục tiêu, lập tức làm mới hành động trong lượt này và có thể hành động lần nữa.',
                    Mô_tả: 'Cây thương yêu quý của Pháp Lộ Đặc, một cây kỵ thương khổng lồ hai màu đen trắng. Nghe nói mũi thương không chỉ từng nhuốm máu vô số cự long, mà còn từng xuyên thủng sao băng trên bầu trời. Người cầm nó sẽ xem mặt đất là bãi săn.',
                    Hòm_trang_bị: false
                },
                'Trọng Giáp Hắc Kim': {
                    Loại: 'Phòng_cụ', Vị_trí_trang_bị: 'Áo', Tên: 'Trọng Giáp Hắc Kim', Phẩm_chất: 'Thần_khí', Cấp_độ: 95, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Thể_chất: 8, Giảm_sát_thương_vật_lý: 15, Giới_hạn_sinh_mệnh: 500 },
                    Hiệu_quả: '[Bị động - Bất Động] Là trọng giáp nhưng được xem như khinh giáp, không ảnh hưởng kiểm định khéo léo. Miễn nhiễm hiệu ứng [Đẩy lùi], [Ngã xuống];[Bị động - Nghịch Lân] Mọi kẻ tấn công cận chiến gây sát thương cho người mặc đều chịu sát thương phản lại bằng (hiệu chỉnh Thể_chất)d6 của người mặc;[Chủ động - Khiên Long Ngữ] Mỗi ngày 1 lần, khi HP về 0 thì đổi từ 0 thành 1 và nhận trạng thái [Vô địch] kéo dài 1 lượt.',
                    Mô_tả: 'Bộ trọng giáp màu đen ánh vàng với vai giáp và giáp ngực tạo hình lộng lẫy. Nói là hộ cụ không bằng nói nó là phần kéo dài của da hắc long, sẽ phập phồng như đang hô hấp theo chiến ý của chủ nhân.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Hắc Ám Long Kỵ': { Phẩm_chất: 'Sử_thi', Loại: 'Sát_thương', Hiệu_quả: 'Cưỡi ma long lao xuống từ trời cao oanh kích khu vực mặt đất, đòn đánh gây [1000% + 25% × (Cấp_độ - 1)] sát thương vật lý; kẻ địch trúng đòn phải kiểm định ý chí một lần, thất bại thì rơi vào [Run sợ](AC-2) trong 1 lượt.', Mô_tả: 'Triệu hồi tọa kỵ hắc long từ trời giáng xuống, song thương xuyên thủng mặt đất; nơi long uy lan tới, vạn vật đều run rẩy.' },
                'Phóng Thích Long Uy': { Phẩm_chất: 'Truyền_thuyết', Loại: 'Đặc_biệt', Hiệu_quả: 'Phóng thích đấu khí của bá chủ bầu trời; kẻ địch thấp hơn bản thân trên 20 cấp tự động rơi vào [Sợ hãi] và không thể hành động 1 lượt; các kẻ địch còn lại bị -2 ở kiểm định tấn công đầu tiên trong lượt này.', Mô_tả: 'Chỉ bằng khí thế đã khiến kẻ yếu quỳ gối; đó là uy nghi vương giả bẩm sinh của bá chủ thống ngự bầu trời.' }
            },
            Ngoại_hình: 'Thiếu nữ sừng rồng tóc dài đen nhánh, song đồng đỏ máu; trên đầu có một đôi sừng rồng đen cong về sau, chân sừng đeo vòng vàng, lông mày thường hơi nhíu để giữ vẻ uy nghiêm.',
            Trang_phục: 'Trọng giáp đen ánh vàng phối váy ngắn xếp ly, vai giáp lộng lẫy như cánh rồng, cổ áo buộc dải lụa đỏ, bốt giáp đen quá gối điểm hộ giáp vân rồng.',
            Độ_thiện_cảm: 20,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Hồng Liên': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 16, Nhanh_nhẹn: 19, Thể_chất: 15, Trí_lực: 10, Cảm_nhận: 16, Sức_hấp_dẫn: 14 },
            Danh_sách_trang_bị: {
                'Hoa Vô Thập Nhật Hồng': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Hoa Vô Thập Nhật Hồng', Phẩm_chất: 'Sử_thi', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 2, Cảm_nhận: 1, Toàn_kỹ_năng: 2 },
                    Hiệu_quả: '[Tàng Hoa] Kích hoạt khi bạn phát động tấn công cận chiến bằng tư thế cư hợp, rút đao hoặc truy kích; kiểm định tấn công lần này +4, và ngưỡng bạo kích được xem như giảm 2;[Chấn Huyết] Kích hoạt khi tấn công cận chiến của bạn trúng đích, nhận 1 tầng [Chấn Huyết] kéo dài tới hết chiến đấu, tối đa 5 tầng; mỗi tầng khiến sát thương cuối của tấn công cận chiến +6%, mỗi lần nhận [Chấn Huyết] mất 1% sinh mệnh hiện tại;[Hồng Hoa Tận] Khi bạn dùng hành động độc lập thứ 2 hoặc thứ 3 trong lượt này để phát động tấn công cận chiến, có thể tiêu hao 1 tầng [Chấn Huyết] để triệt tiêu 3 điểm giảm trúng do liên kích; nếu hệ số trúng của đòn đánh lớn hơn 0, mục tiêu nhận [Chảy máu] 2 lượt;[Thập Nhật Hồng] Mỗi trận 1 lần, có thể phát động khi HP không cao hơn 25% hoặc [Chấn Huyết] đạt 5 tầng. Thực hiện một nhát chém đường thẳng 15 yard, gây [1000% + 25% × (Cấp_độ - 1)] sát thương vật lý, chắc chắn trúng; sau kết toán xóa sạch [Chấn Huyết], mất 25% sinh mệnh hiện tại, tối thiểu giữ lại 1 điểm.',
                    Mô_tả: 'Thanh thái đao vỏ đen kế thừa từ người chị Tường Hoa, lưỡi đao cực mảnh. Thanh đao này tuy không có ý thức tự thân, nhưng luôn khát máu của người cầm. Khi hoa nở tới độ rực rỡ nhất, cũng là khởi đầu của tàn phai.',
                    Hòm_trang_bị: false
                },
                'Chiến Y Nhật Phong Đỏ Trắng': {
                    Loại: 'Phòng_cụ', Vị_trí_trang_bị: 'Áo', Tên: 'Chiến Y Nhật Phong Đỏ Trắng', Phẩm_chất: 'Tinh_lương', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 2 },
                    Hiệu_quả: 'Nhẹ nhàng linh hoạt, tăng nhẹ tỷ lệ né tránh.',
                    Mô_tả: 'Chiến y phong cách Nhật với tay áo rộng, chủ đạo màu trắng, cổ áo và tay áo viền đỏ, thuận tiện vung đao.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Hoa Vô Thập Nhật Hồng': { Phẩm_chất: 'Truyền_thuyết', Loại: 'Sát_thương', Hiệu_quả: 'Dùng cư hợp rút đao chém ra kiếm khí siêu tốc, đòn đánh gây [800% + 20% × (Cấp_độ - 1)] sát thương vật lý; nếu lượt này đã liên tục phát động tấn công, sát thương cuối của đòn này tăng thêm 20%, bản thân mất 5% sinh mệnh hiện tại.', Mô_tả: 'Ánh đao lóe lên, nhát chém đã tới. Trong thời đại đạn súng bay ngang dọc, cô chiến đấu bằng đao kiếm và nghiền ép mọi thứ bằng kỹ lượng thuần túy.' },
                'Kiếm Ý Trăm Năm': { Phẩm_chất: 'Thần_khí', Loại: 'Đặc_biệt', Hiệu_quả: 'Vào thế cư hợp; đòn tấn công kế tiếp chắc chắn bạo kích, chắc chắn trúng và bỏ qua giáp của mục tiêu.', Mô_tả: 'Trăm năm mài giũa ngưng tụ vào một đao; khoảnh khắc vỏ đao khẽ vang, ngay cả không khí cũng bị chém đứt.' }
            },
            Ngoại_hình: 'Nữ kiếm khách phong cách Nhật với mái tóc xám bạc dài vừa rẽ lệch, đôi mắt hổ phách dịu ấm; trên tóc cài hoa trà đỏ, đeo khuyên tai đỏ, móng tay sơn đỏ. Vẻ lười biếng vẫn lộ khí chất nghiêm nghị.',
            Trang_phục: 'Chiến y tay rộng phong cách Nhật màu trắng viền đỏ, vạt áo rộng để lộ xương quai xanh, đai lưng đỏ sẫm ôm eo, váy giáp đỏ trắng xẻ cao để lộ đôi chân thon dài. Sau lưng đeo thái đao vỏ đen.',
            Độ_thiện_cảm: 30,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Tinh Cực': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 10,
            Thuộc_tính: { Sức_mạnh: 10, Nhanh_nhẹn: 14, Thể_chất: 10, Trí_lực: 18, Cảm_nhận: 16, Sức_hấp_dẫn: 18 },
            Danh_sách_trang_bị: {
                'Kiếm Sao Nguyên Thạch': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Kiếm Sao Nguyên Thạch', Phẩm_chất: 'Hiếm', Cấp_độ: 10, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Trí_lực: 4, Giảm_sát_thương_ma_pháp: 5 },
                    Hiệu_quả: 'Đòn đánh kèm sát thương ma pháp thuộc tính sao trời; gây thêm 15% sát thương lên mục tiêu có kháng ma pháp thấp.',
                    Mô_tả: 'Vũ khí nguyên thạch dạng kiếm Tây mảnh dài; thân kiếm tỏa ánh sao nhạt khi chiến đấu, dung hợp sức mạnh của nghi thức chiêm tinh, vừa là vũ khí vừa là môi giới thi pháp.',
                    Hòm_trang_bị: false
                },
                'Thiên Cầu Nghi Cầm Tay': {
                    Loại: 'Trang_sức', Vị_trí_trang_bị: 'Tay_phụ', Tên: 'Thiên Cầu Nghi Cầm Tay', Phẩm_chất: 'Đặc_biệt', Cấp_độ: 10, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Cảm_nhận: 3 },
                    Hiệu_quả: 'Hỗ trợ chiêm tinh, giúp cảm nhận rõ hơn chỉ dẫn của sao trời. Khi chiêm tinh, ảo ảnh tinh tú hiện quanh người; trong chiến đấu có thể dự đoán quỹ đạo tấn công của địch, kiểm định né tránh +2',
                    Mô_tả: 'Thiên cầu nghi nhỏ Tinh Cực luôn mang theo, là đạo cụ quan trọng để cô quan sát trời sao và thi triển kiếm nghi tinh tú.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Kiếm Nghi Tinh Tú': { Phẩm_chất: 'Hiếm', Loại: 'Sát_thương', Hiệu_quả: 'Dùng kiếm nghi ánh sao cắt mở mục tiêu, đòn đánh gây [300% + 12% × (Cấp_độ - 1)] sát thương hỗn hợp; nếu kháng ma pháp của mục tiêu thấp hơn kháng vật lý, sát thương cuối của đòn này tăng thêm 15%.', Mô_tả: 'Nghi thức chiến đấu ưu nhã mà thần bí, dung hợp kiếm thuật gia truyền và tri thức chiêm tinh.' },
                'Tiên Tri Tinh Tượng': { Phẩm_chất: 'Hiếm', Loại: 'Hỗ_trợ', Hiệu_quả: 'Thông qua chiêm tinh cung cấp dự đoán chiến thuật cho đội; toàn đội được +2 kiểm định trúng trong lượt kế tiếp, kéo dài 2 lượt; nếu mục tiêu đã bị đánh dấu hoặc khống chế, sát thương cuối của đòn tấn công đầu tiên tăng thêm 15%. Bình thường cũng có thể báo trước lành dữ tương lai và giải đọc những câu đố chưa biết.', Mô_tả: 'Thiên cầu nghi xoay nhanh, trật tự sao trời hé lộ hướng đi của tương lai gần và soi sáng đường phía trước cho đồng đội.' }
            },
            Ngoại_hình: 'Thiếu nữ trí thức tóc xanh đậm dài tới eo, mắt xanh trong trẻo; trên tóc điểm trang sức hình sao, khi cười mắt cong như trăng non, khí chất trầm tĩnh mà sáng trong như bầu trời đêm.',
            Trang_phục: 'Áo sơ mi tay phồng màu trắng buộc dây mảnh màu đen, váy phồng cạp cao xanh đậm thêu hoa văn sao vàng, eo đan dây đen chéo, đi giày buộc dây màu đen.',
            Độ_thiện_cảm: 20,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Aiklisia': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 18, Nhanh_nhẹn: 12, Thể_chất: 16, Trí_lực: 12, Cảm_nhận: 14, Sức_hấp_dẫn: 18 },
            Danh_sách_trang_bị: {
                'Búa Lớn Xương Rồng - Sprigans': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Búa Lớn Xương Rồng - Sprigans', Phẩm_chất: 'Hiếm', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Sức_mạnh: 4 },
                    Hiệu_quả: 'Lực xung kích vật lý cực cao, có xác suất kích hoạt bắn nổ.',
                    Mô_tả: 'Chiếc búa máy khổng lồ cải tạo từ hộp sọ rồng không rõ nguồn gốc, bên trong ẩn một pháo yêu giữ báu hoạt bát.',
                    Hòm_trang_bị: false
                },
                'Trang Phục Du Hành Dragma': {
                    Loại: 'Phòng_cụ', Vị_trí_trang_bị: 'Áo', Tên: 'Trang Phục Du Hành Dragma', Phẩm_chất: 'Thường', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 1 },
                    Hiệu_quả: 'Thuận tiện đi đường dài, bền mòn và khó bẩn.',
                    Mô_tả: 'Áo ba lỗ trắng phối áo choàng ngắn xanh mực và quần short đen, một bộ đồ du hành đầy sức sống.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Cự Chùy Mãnh Kích': { Phẩm_chất: 'Hiếm', Loại: 'Sát_thương', Hiệu_quả: 'Vung búa lớn xương rồng tung một đòn toàn lực, gây [300% + 12% × (Cấp_độ - 1)] sát thương vật lý; kẻ địch trúng đòn phải miễn trừ sức mạnh một lần, thất bại thì bị [Đánh bay] và [Ngã xuống].', Mô_tả: 'Một búa thế mạnh lực nặng, mặt đất cũng bị đập nứt. Tuy không có chương pháp, thứ bạo lực thẳng thắn ấy lại khiến người ta yên tâm.' },
                'Sức Ăn Của Thánh Nữ': { Phẩm_chất: 'Tinh_lương', Loại: 'Đặc_biệt', Hiệu_quả: 'Sau khi ăn sẽ nhanh chóng hồi phục thể lực và thương thế, lập tức hồi 20% sinh mệnh tối đa và xóa 1 tầng [Mệt mỏi] hoặc trạng thái bất lợi nhẹ.', Mô_tả: 'Thể chất thần kỳ chỉ cần ăn no là có thể hồi đầy máu.' }
            },
            Ngoại_hình: 'Thiếu nữ đầy sức sống với tóc xoăn dài màu bạch kim buộc đuôi ngựa đơn, tóc ngố dựng trên đầu và đôi mắt bạc trắng; trước trán cài trang sức hình thoi màu tím, luôn mang nụ cười rạng rỡ.',
            Trang_phục: 'Áo ba lỗ trắng khoác ngoài áo choàng ngắn xanh mực, quần short đen thắt đai da nâu, găng tay nâu hở ngón, đeo túi đồ ăn vặt chéo vai, vác cây búa xương rồng còn lớn hơn cả bản thân',
            Độ_thiện_cảm: 10,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Nại Nhã Lệ': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Ảo_tưởng_chủng',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 14, Nhanh_nhẹn: 16, Thể_chất: 14, Trí_lực: 20, Cảm_nhận: 16, Sức_hấp_dẫn: 20 },
            Danh_sách_trang_bị: {
                'Roi Gai Hỗn Độn': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Roi Gai Hỗn Độn', Phẩm_chất: 'Thần_khí', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Trí_lực: 5, Giảm_sát_thương_ma_pháp: 5 },
                    Hiệu_quả: 'Khi tấn công có xác suất quấn lấy mục tiêu, khiến hành động lượt sau của mục tiêu -1.',
                    Mô_tả: 'Cây roi dài đen nhánh quấn đầy gai sống, đầu roi thỉnh thoảng tự ngọ nguậy.',
                    Hòm_trang_bị: false
                },
                'Khối Đa Diện Lệch Ba Tám Mặt Lấp Lánh': {
                    Loại: 'Trang_sức', Vị_trí_trang_bị: 'Dây_chuyền', Tên: 'Khối Đa Diện Lệch Ba Tám Mặt Lấp Lánh', Phẩm_chất: 'Thần_khí', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Trí_lực: 3, Cảm_nhận: 2 },
                    Hiệu_quả: 'Môi giới khế ước, duy trì sự thực thể hóa của Nại Nhã Lệ ở hiện thế; thậm chí có thể dùng nó làm môi giới để nối tới bờ kia thứ nguyên, triệu hồi "những người bạn" của Nại Nhã Lệ. Mỗi ngày một lần, xé mở thứ nguyên và triệu hồi một sinh vật lệch pha có cấp ngang <user> hỗ trợ chiến đấu trong 10 phút.',
                    Mô_tả: 'Viên pha lê đa diện tỏa ánh cầu vồng bất quy tắc, là neo khế ước nối tới bờ kia thứ nguyên, nhiệt độ vĩnh viễn hơi lạnh',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Lệch Pha - Cấm Kỵ': { Phẩm_chất: 'Thần_khí', Loại: 'Sát_thương', Hiệu_quả: 'Gọi sức mạnh hỗn độn từ dị thứ nguyên oanh kích kẻ địch, gây [500% + 15% × (Cấp_độ - 1)] sát thương ma pháp; kẻ địch trúng đòn phải miễn trừ Cảm_nhận một lần, thất bại thì rơi vào [Ô nhiễm tinh thần] 2 lượt.', Mô_tả: 'Là một phần nhỏ sức mạnh của hóa thân ngoại thần, mang hiệu ứng ô nhiễm tinh thần và vặn xoắn không gian mãnh liệt.' },
                'Giờ Nghỉ Trà': { Phẩm_chất: 'Hiếm', Loại: 'Đặc_biệt', Hiệu_quả: 'Buộc nhịp chiến đấu tạm dừng để uống trà nghỉ ngơi, hồi cho bản thân và người khế ước mỗi bên 25% sinh mệnh tối đa, đồng thời xóa 1 trạng thái bất lợi; kiểm định hành động đầu tiên của phe địch trong lượt này -2.', Mô_tả: 'So với chiến đấu, uống trà chiều cùng người khế ước vẫn quan trọng hơn.' }
            },
            Ngoại_hình: 'Thiếu nữ yêu diễm với tóc bạc trắng buộc hai bên, sừng ác ma như sừng cừu núi và đôi mắt thạch anh tím; tai tinh linh nhọn dài, khóe mắt vẽ hoa văn succubus tím đỏ.',
            Trang_phục: 'Bộ đồ liền thân bó sát bóng màu tím đen, phần ngực khoét rộng, sau lưng xòe đôi cánh ác ma, tất đen quá gối phối giày cao gót.',
            Độ_thiện_cảm: 40,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Orchis': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Sinh_mệnh_nhân_tạo',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 10, Nhanh_nhẹn: 16, Thể_chất: 12, Trí_lực: 18, Cảm_nhận: 16, Sức_hấp_dẫn: 14 },
            Danh_sách_trang_bị: {
                'Găng Tay Chỉ Bạc': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Găng Tay Chỉ Bạc', Phẩm_chất: 'Hiếm', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 2, Trí_lực: 2, Cảm_nhận: 1 },
                    Hiệu_quả: 'Đầu ngón tay có thể phóng ra sợi chỉ gần như vô hình, dùng để điều khiển búp bê, trói buộc mục tiêu và giăng lưới bẫy.',
                    Mô_tả: 'Đôi găng tay đen mỏng như cánh ve, đầu ngón gắn vòng dẫn chỉ tinh vi, gần như không thể dùng mắt thường bắt được quỹ đạo sợi chỉ.',
                    Hòm_trang_bị: false
                },
                'Con Rối Lloyd': {
                    Loại: 'Đặc_biệt', Vị_trí_trang_bị: 'Tùy_tùng', Tên: 'Con Rối Lloyd', Phẩm_chất: 'Thần_khí', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Sức_mạnh: 3, Thể_chất: 2 },
                    Hiệu_quả: 'Trong chiến đấu có thể được Orchis điều khiển từ xa để áp chế kẻ địch áp sát. Có thể thực hiện lệnh chặn đường, hộ vệ và đột kích.',
                    Mô_tả: 'Con rối cao lớn đội mũ lễ và đeo mặt nạ trắng; dưới áo khoác dài màu đen giấu móng vuốt kim loại sắc bén, là bạn đồng hành đáng tin cậy nhất của Orchis.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Thuật Điều Tơ - Lloyd Đột Kích': { Phẩm_chất: 'Thần_khí', Loại: 'Sát_thương', Hiệu_quả: 'Điều khiển Lloyd lao tới tốc độ cao xé rách mục tiêu, đòn đánh gây [500% + 15% × (Cấp_độ - 1)] sát thương vật lý; nếu mục tiêu đang [Trói buộc] hoặc ở phạm vi sát thân, sát thương cuối của đòn này tăng thêm 20%.', Mô_tả: 'Con rối dưới sự kéo dẫn của chỉ bạc lao ra như dã thú không tiếng động, hoàn tất áp chế trước khi kẻ địch kịp phản ứng.' },
                'Lưới Trói Chỉ Bạc': { Phẩm_chất: 'Hiếm', Loại: 'Hỗ_trợ', Hiệu_quả: 'Giăng lưới tơ trong khu vực chỉ định; mục tiêu trúng phải bị hạn chế hành động và giảm né tránh; kẻ địch vượt qua miễn trừ Nhanh_nhẹn vẫn chịu [Giảm tốc] 1 lượt.', Mô_tả: 'Những sợi tơ gần như vô hình dưới ánh sáng; chỉ tới khi con mồi va vào, nó mới hiểu mình đã bị khoanh vùng từ lâu.' }
            },
            Ngoại_hình: 'Thiếu nữ nhỏ nhắn tóc dài bạc trắng, mắt đỏ như đá quý; thần sắc bình tĩnh kiềm chế, ánh nhìn thường dừng giữa phương xa và con rối.',
            Trang_phục: 'Váy quây phong cách gothic màu đen, trước ngực điểm hoa hồng xanh, phối găng chỉ bạc và bốt ngắn; tổng thể lạnh tĩnh mà tinh xảo.',
            Độ_thiện_cảm: 50,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Ung': {
            Giới_tính: 'Không',
            Ở_gần: true,
            Chủng_tộc: 'Ảo_tưởng_chủng_(Tinh_Tiềm_Giả)',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 8, Nhanh_nhẹn: 14, Thể_chất: 20, Trí_lực: 16, Cảm_nhận: 18, Sức_hấp_dẫn: 10 },
            Danh_sách_trang_bị: {},
            Kỹ_năng: {
                'Giáp Ký Sinh': { Phẩm_chất: 'Thần_khí', Loại: 'Hỗ_trợ', Hiệu_quả: 'Ung lan dọc bề mặt cơ thể kỵ sĩ, hình thành ngoại cốt chitin và cung cấp hình thái khác nhau theo phần trăm sinh mệnh hiện tại của kỵ sĩ: khi HP>50% là chế độ khinh giáp (AC+2, không ảnh hưởng Nhanh_nhẹn); khi HP≤50% tự động chuyển sang chế độ trọng giáp (AC+4, giảm sát thương vật lý +10%, tốc độ di chuyển -5 thước).', Mô_tả: 'Nó đọc hiểu cơ thể kỵ sĩ còn rõ hơn chính kỵ sĩ; trước khi bạn ý thức được nguy hiểm, lớp giáp đã mọc xong.' },
                'Bắn Cơ Thể': { Phẩm_chất: 'Thần_khí', Loại: 'Sát_thương', Hiệu_quả: 'Ung bắn một phần tổ chức cơ thể với tốc độ cao và cắm vào bề mặt mục tiêu, gây [500% + 15% × (Cấp_độ - 1)] sát thương thuộc tính acid; sau khi trúng, kèm [Ăn mòn acid] kéo dài 3 lượt, mục tiêu có thể dùng hành động để kiểm định Sức_mạnh DC13 nhằm nhổ nó ra.', Mô_tả: 'Một cục màu hồng dính lên người bạn rồi bắt đầu khoan vào trong. Đây có lẽ là đòn tấn công tầm xa buồn nôn nhất thế giới.' }
            },
            Ngoại_hình: 'Sinh vật hồng tròn trịa cỡ từ nắm tay tới quả bóng chuyền, bán trong suốt, có một con mắt lớn có thể di chuyển trên bề mặt cơ thể và vài xúc tu nhỏ.',
            Trang_phục: 'Không (ký sinh trên vai phải của kỵ sĩ)',
            Độ_thiện_cảm: 100,
            Lời_thề_đồng_hành: true,
            Tuyệt_kỹ_liên_kết: {
                'Ghép Chi': { Phẩm_chất: 'Truyền_thuyết', Loại: 'Sát_thương', Hiệu_quả: 'Ung bạo tẩu phình to và phát động thôn phệ lên mục tiêu hấp hối, gây [800% + 20% × (Cấp_độ - 1)] sát thương vật lý; nếu mục tiêu bị hạ hoặc trên sân có thi thể có thể thôn phệ, trong 5 hiệp sẽ nhận 1 kỹ năng của đối tượng và cộng thêm một nửa thuộc tính cao nhất của đối tượng. Sau khi kết thúc, Ung cưỡng chế đào thải, kỵ sĩ mất 10% HP tối đa và nhận 1 tầng [Mệt mỏi].', Mô_tả: 'Xúc tu xé mở xác chết, xương thịt gân mạch bị kéo vào trong cơ thể kỵ sĩ, cánh tay thứ ba chống bung ra từ dưới xương sườn, nắm lấy vũ khí vẫn còn nhỏ máu.' }
            }
        },
        'Hiiro': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Linh_thể_(thần_khí)',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 16, Nhanh_nhẹn: 20, Thể_chất: 12, Trí_lực: 10, Cảm_nhận: 14, Sức_hấp_dẫn: 16 },
            Danh_sách_trang_bị: {},
            Kỹ_năng: {
                'Thủy Thuật': { Phẩm_chất: 'Thần_khí', Loại: 'Hỗ_trợ', Hiệu_quả: 'Tạo khiên nước quanh bản thân và Yato, hấp thu sát thương tương đương 20% sinh mệnh tối đa của người thi triển; trong thời gian khiên nước tồn tại, có thể phóng [Thủy lao] giam 1 mục tiêu trong 1 lượt.', Mô_tả: 'Hiiro điều khiển dòng nước ngưng thành khiên, tích tụ tới giới hạn rồi hóa thành thủy lao nuốt chửng mọi thứ.' },
                'Triệu Hồi Diện Yêu': { Phẩm_chất: 'Thần_khí', Loại: 'Hỗ_trợ', Hiệu_quả: 'Triệu hồi bầy sói mặt nạ hỗ trợ chiến đấu; mỗi lượt sói mặt nạ tấn công gây [500% + 15% × (Cấp_độ - 1)] × 60% sát thương thuộc tính bóng tối; mục tiêu trúng đòn nhận [Nguyền rủa] 2 lượt.', Mô_tả: 'Quyến thuộc do Hiiro gọi ra, bầy sói đen nhánh tràn ra từ hư không.' }
            },
            Ngoại_hình: 'Thiếu nữ tóc ngắn đen, da trắng, mắt đỏ; thần sắc bình tĩnh, giỏi vô tình khuấy động lòng người, trông thuần khiết vô tội nhưng lại có sức quyến rũ thần bí và phi nhân.',
            Trang_phục: 'Khi hóa thành thần khí là một thanh thái đao đen nhánh không tsuba không vỏ, thân đao lưu chuyển ánh đỏ thẫm. Khi ở nhân hình mặc kimono đen.',
            Độ_thiện_cảm: 95,
            Lời_thề_đồng_hành: true,
            Tuyệt_kỹ_liên_kết: {
                'Chém!': { Phẩm_chất: 'Truyền_thuyết', Loại: 'Sát_thương', Hiệu_quả: 'Hiiro dùng xích thủy lao trói buộc mục tiêu, Yato dịch chuyển tức thời ra sau lưng mục tiêu và chém xuống một đòn thanh tẩy, gây [800% + 20% × (Cấp_độ - 1)] sát thương vật lý; đòn này bỏ qua AC và chắc chắn trúng. Nếu hạ mục tiêu bằng đòn này, lập tức hồi 50 CP.', Mô_tả: 'Xích nước quấn thân, lời chúc đã định, một đao chém đôi.' }
            }
        },
        'Asuna': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 14, Nhanh_nhẹn: 18, Thể_chất: 12, Trí_lực: 14, Cảm_nhận: 16, Sức_hấp_dẫn: 18 },
            Danh_sách_trang_bị: {
                'Kiếm Phong Hoa': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Kiếm Phong Hoa', Phẩm_chất: 'Hiếm', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 2, Sát_thương_bạo_kích: 5 },
                    Hiệu_quả: 'Khi tấn công có xác suất khiến kiểm định Nhanh_nhẹn tiếp theo +1.',
                    Mô_tả: 'Thân kiếm nhẹ và sắc, phù hợp tung ra những cú đâm tốc độ cao như vũ điệu.',
                    Hòm_trang_bị: false
                },
                'Đồng Phục Tân Thủ': {
                    Loại: 'Phòng_cụ', Vị_trí_trang_bị: 'Áo', Tên: 'Đồng Phục Tân Thủ', Phẩm_chất: 'Tinh_lương', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 1 },
                    Hiệu_quả: 'Tăng mạnh độ linh hoạt khi hành động, đồng thời kèm kháng tinh thần yếu.',
                    Mô_tả: 'Trang bị sơ cấp dùng chung cho người mới.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Tinh Tiết Phi Tán': { Phẩm_chất: 'Hiếm', Loại: 'Sát_thương', Hiệu_quả: 'Vung tế kiếm tốc độ cao thực hiện năm nhát đâm liên tiếp, gây [300% + 12% × (Cấp_độ - 1)] sát thương vật lý; nếu đòn này trúng, kiểm định tấn công tiếp theo của bản thân +2.', Mô_tả: 'Ngũ liên kích như sao băng, là tuyệt kỹ nhanh nhẹn phát động bằng tốc độ phản xạ thần kinh vượt người thường.' },
                'Pha Lê Chữa Lành': { Phẩm_chất: 'Tinh_lương', Loại: 'Hỗ_trợ', Hiệu_quả: 'Tiêu hao đạo cụ, nhanh chóng hồi 30% sinh mệnh tối đa cho bản thân hoặc 1 đồng đội; nếu sinh mệnh mục tiêu dưới 50%, xóa thêm 1 trạng thái bất lợi nhẹ.', Mô_tả: 'Pha lê hồi phục chuẩn bị để ứng phó tình huống bất ngờ, thể hiện sự cẩn trọng và chu đáo của cô dưới hai thân phận tiểu thư nhà giàu và lãnh tụ.' }
            },
            Ngoại_hình: 'Mái tóc dài màu hạt dẻ xõa như thác trên vai, gương mặt tinh xảo xinh đẹp lộ sự giáo dưỡng và dè dặt đặc trưng của đại tiểu thư nhà Yuuki; đôi mắt hổ phách lóe ánh nghiêm nghị khi chiến đấu.',
            Trang_phục: 'Mặc áo bó eo đỏ sẫm và váy ngắn xếp ly, khoác giáp ngực da nhẹ và áo choàng vải thô có mũ trùm lớn. Chỉ là phòng cụ giản dị ở giai đoạn tân thủ.',
            Độ_thiện_cảm: 20,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Shiro': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 6, Nhanh_nhẹn: 12, Thể_chất: 6, Trí_lực: 25, Cảm_nhận: 14, Sức_hấp_dẫn: 18 },
            Danh_sách_trang_bị: {
                'Bàn Cờ Blank': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Bàn Cờ Blank', Phẩm_chất: 'Thần_khí', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Trí_lực: 1, Cảm_nhận: 1, Cơ_bản: 1 },
                    Hiệu_quả: '[Đọc trước nước cờ] Khi Shiro chưa chịu sát thương trong lượt này, kiểm định trúng của kỹ năng sát thương hoặc khống chế đầu tiên +1;[Phân tích tàn cuộc] Khi mục tiêu ở trạng thái [Chiếu tướng], [Mất thăng bằng] hoặc [Trói buộc], sát thương cuối Shiro gây ra +15%;[Hiệu chỉnh kỳ lộ] Khi Shiro thực hiện kiểm định Cảm_nhận (nhìn thấu), Trí_lực (điều tra) và kiểm định liên quan tới tiên công, +1.',
                    Mô_tả: 'Bàn cờ gấp mỏng nhẹ hai màu đen trắng, góc cạnh khảm hoa văn bạc tinh xảo. Khi mở ra sẽ tự động chiếu ô cờ bán trong suốt và quỹ đạo hành động, là môi giới tính toán để Shiro phân tích chiến trường như một ván cờ.',
                    Hòm_trang_bị: false
                },
                'Đồng Phục Thủy Thủ': {
                    Loại: 'Phòng_cụ', Vị_trí_trang_bị: 'Áo', Tên: 'Đồng Phục Thủy Thủ', Phẩm_chất: 'Tinh_lương', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 1 },
                    Hiệu_quả: '[Bước tĩnh] Khi Shiro ở trong nhà, thành trấn hoặc môi trường chưa bị bao vây, kiểm định liên quan tới ẩn nấp và né tránh +1',
                    Mô_tả: 'Đồng phục thủy thủ, dáng rộng hơi ngắn, cổ áo và tay áo viền đường sáng màu. Khi phối với tất quá gối và giày da nhỏ, vừa giữ nét non nớt của đồng phục học sinh, vừa mang vẻ quý khí tinh tế khó xem nhẹ.',
                    Hòm_trang_bị: false
                },
                'Vương Miện Nhỏ Elkia': {
                    Loại: 'Trang_sức', Vị_trí_trang_bị: 'Món_đội_đầu', Tên: 'Vương Miện Nhỏ Elkia', Phẩm_chất: 'Thần_khí', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Cảm_nhận: 1, Áo_nghĩa: 1 },
                    Hiệu_quả: '[Tuyên cáo chiếu tướng] Mỗi trận 1 lần (hành động phụ), chỉ định một kẻ địch trong 30 thước nhận [Chiếu tướng] 2 lượt: kiểm định trúng của đòn tấn công đầu tiên phe ta nhằm vào mục tiêu +2, và nếu mục tiêu đó đã hành động, sát thương cuối gây lên nó tăng thêm 20%;[Cộng hưởng nương tựa] Khi trong 10 thước quanh Shiro có đồng đội đáng tin, kiểm định ý chí của Shiro +2, miễn nhiễm [Sợ hãi] thông thường.',
                    Mô_tả: 'Chiếc vương miện nhỏ nhắn nhưng chế tác cực tinh xảo, như phụ kiện vương thất dành cho búp bê. Đội trên đầu Shiro không hề buồn cười, ngược lại còn làm nổi bật khí chất nữ vương yên tĩnh ấy.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Phong Bộ': { Phẩm_chất: 'Thần_khí', Loại: 'Sát_thương', Hiệu_quả: 'Thông qua dự đoán để chặn trước điểm rơi và đường né của kẻ địch, gây [500% + 15% × (Cấp_độ - 1)] sát thương ma pháp lên kẻ địch trong khu vực; kẻ địch trúng đòn phải miễn trừ Nhanh_nhẹn một lần, thất bại thì rơi vào [Mất thăng bằng] (AC-2, kiểm định trúng kế tiếp -1) trong 1 lượt.', Mô_tả: 'Kẻ địch sẽ phát hiện mọi "vị trí an toàn" của mình đều đã bị tính hết từ lâu.' },
                'Dự Đoán Của Shiro': { Phẩm_chất: 'Thần_khí', Loại: 'Hỗ_trợ', Hiệu_quả: 'Chỉ định 1 đồng đội vào trạng thái [Hiệp đồng] trong 2 lượt: kiểm định trúng +2, ngưỡng bạo kích -1; nếu tấn công trúng mục tiêu đang ở [Chiếu tướng], [Mất thăng bằng] hoặc [Trói buộc], sát thương cuối của đòn đó tăng thêm 40%.', Mô_tả: 'Dưới sự quy hoạch của cô, mỗi bước đi của đồng đội đều như đang tiến theo tuyến đường thắng lợi đã được viết sẵn.' }
            },
            Ngoại_hình: 'Da trắng, dáng người nhỏ nhắn. Mái tóc trắng siêu dài gần rủ tới bên chân, một bên buộc thành đuôi ngựa lệch phủ vai, trước trán rủ tóc mái mảnh dài và một lọn tóc ngố bướng bỉnh.',
            Trang_phục: 'Đồng phục thủy thủ cải biên màu tối phối tất quá gối và giày da mũi tròn; giữa chân váy và miệng tất giữ vùng tuyệt đối rõ rệt; đội một vương miện nhỏ tinh xảo, tổng thể như một tiểu nữ vương quý phái mà xa cách.',
            Độ_thiện_cảm: 35,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {
                'Chiếu Hết': { Phẩm_chất: 'Truyền_thuyết', Loại: 'Hỗ_trợ', Hiệu_quả: 'Shiro chỉ định một kẻ địch nhận [Chiếu hết] tới hết lượt này: <user> và Shiro mỗi người lập tức phát động 1 đòn tấn công hiệp đồng không chịu phạt liên kích; trong đó đòn truy kích của Shiro gây [800% + 20% × (Cấp_độ - 1)] sát thương ma pháp. Nếu đòn đầu không trúng, đòn thứ hai bỏ qua kiểm định trúng, cưỡng chế trúng và chắc chắn bạo kích; nếu đòn đầu trúng, sát thương cuối của đòn thứ hai nhân đôi, và sau kết toán chém chết kẻ địch có sinh mệnh dưới 20%.', Mô_tả: '"checkmate." Khi cô thốt ra kết luận, thắng bại thường đã được quyết định trước cả bản thân đòn đánh.' }
            }
        },
        'Ruruka': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 10, Nhanh_nhẹn: 16, Thể_chất: 14, Trí_lực: 18, Cảm_nhận: 16, Sức_hấp_dẫn: 18 },
            Danh_sách_trang_bị: {
                'Trượng Bí Ẩn Nước Mắt': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Trượng Bí Ẩn Nước Mắt', Phẩm_chất: 'Sử_thi', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Trí_lực: 4, Giảm_sát_thương_ma_pháp: 10 },
                    Hiệu_quả: 'Khi phóng ma pháp kèm hiệu ứng ánh chảy bóng tối, sát thương ma pháp dạng pháo quang tăng 15%.',
                    Mô_tả: 'Pháp trượng chuyên dụng khi Ruruka biến thân thành Pretty Cure ánh sáng; thường ngày hóa thành vòng cổ mặt dây chuyền có hình cây trượng thu nhỏ đeo trước ngực.',
                    Hòm_trang_bị: false
                },
                'Chiến Y Người Chữa Lành Bóng Tối': {
                    Loại: 'Phòng_cụ', Vị_trí_trang_bị: 'Áo', Tên: 'Chiến Y Người Chữa Lành Bóng Tối', Phẩm_chất: 'Thần_khí', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 1, Thể_chất: 1, Sức_hấp_dẫn: 1 },
                    Hiệu_quả: 'Lần đầu chịu đòn trong mỗi trận sẽ giảm một lượng sát thương nhất định, đồng thời dễ ẩn mình trong bóng tối hơn.',
                    Mô_tả: 'Váy dài quây xẻ cao lấy màu đen làm chủ đạo, điểm nhiều trang sức hình giọt nước tím và ghim cài sao. Vừa có vẻ lộng lẫy của Pretty Cure ánh sáng, vừa hòa trộn nét thần bí của quái đạo.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Pháo Quang Bóng Tối': { Phẩm_chất: 'Thần_khí', Loại: 'Sát_thương', Hiệu_quả: 'Ngưng tụ ma lực ánh sáng và bóng tối vào pháp trượng, bắn ra chùm sáng hủy diệt, gây [500% + 15% × (Cấp_độ - 1)] sát thương ma pháp lên kẻ địch trong đường thẳng; nếu mục tiêu đang ở [Bóng tối] hoặc môi trường thiếu sáng, sát thương cuối của đòn này tăng thêm 20%.', Mô_tả: 'Tuy nói là Pretty Cure ánh sáng, nhưng đây hoàn toàn là pháo quang ma pháp oanh tạc không nương tay, uy lực trái ngược hẳn với thân hình nhỏ nhắn ấy.' },
                'Ma Pháp Chữa Lành: Bóng': { Phẩm_chất: 'Hiếm', Loại: 'Hỗ_trợ', Hiệu_quả: 'Dùng ma lực bóng tối trị liệu bản thân và đồng đội xung quanh, hồi 25% sinh mệnh tối đa; nếu mục tiêu gần đây chịu sát thương thuộc tính ánh sáng, hồi thêm 10% sinh mệnh tối đa.', Mô_tả: 'Ai nói bóng tối không thể dùng để chữa lành? Đây là ma pháp dịu dàng và tương phản chỉ thuộc về Pretty Cure quái đạo.' }
            },
            Ngoại_hình: 'Thiếu nữ kín đáo có thể im lặng ăn kem điên cuồng, trong tay luôn ôm bạn đồng hành yêu tinh hình cáo tím tròn vo tên Miên Đường Thám; sau khi biến thân, tóc chợt chuyển thành mái tóc siêu dài màu vàng có chuyển sắc hồng.',
            Trang_phục: 'Thường ngày mặc váy liền màu đen có chân váy viền ren trắng phối áo choàng dài màu đen; sau khi biến thân, hóa thành váy dài xẻ tà lộng lẫy chủ đạo màu đen với nhiều trang sức tím nhạt, tỏa ra sức hút sâu thẳm khó tin.',
            Độ_thiện_cảm: 20,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {}
        },
        'Katisia': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 14, Nhanh_nhẹn: 20, Thể_chất: 24, Trí_lực: 14, Cảm_nhận: 16, Sức_hấp_dẫn: 22 },
            Danh_sách_trang_bị: {
                'Vương Miện Mệnh Định Bất Khuất': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Vương Miện Mệnh Định Bất Khuất', Phẩm_chất: 'Sử_thi', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Sức_hấp_dẫn: 2, Thể_chất: 2, Sát_thương_bạo_kích: 15 },
                    Hiệu_quả: '[Cộng hưởng thủy triều] Khi tấn công trúng, gắn [Phong thực] lên mục tiêu: mỗi tầng khiến AC mục tiêu -1, tối đa cộng dồn 3 tầng, kéo dài tới hết chiến đấu;[Kiếm song sinh] Có thể chuyển giữa hình thái thiếu nữ và hình thái thánh nữ (dáng vẻ biến thành ngự tỷ trưởng thành ngực lớn). Ở hình thái thánh nữ, phạm vi đánh thường mở rộng, loại sát thương chuyển thành sát thương khí động, nhưng cuối mỗi lượt mất 5% sinh mệnh hiện tại.',
                    Mô_tả: 'Thánh vật tấn đao của Rinascita, chuôi kiếm có hình vương miện gai, thân kiếm đồng thời khắc lời cầu nguyện Tuế Chủ và hoa văn Minh Thức. Nó sẽ đổi hình thái theo tâm ý người cầm: khi ở hình thái thiếu nữ thường ngày là lưỡi chém mảnh nhanh nhẹ như lông vũ, khi giải phóng sức mạnh hóa thân thánh nữ sẽ tự động biến thành cự kiếm nặng như núi.',
                    Hòm_trang_bị: false
                },
                'Lễ Phục Dải Lụa Của Thánh Nữ Tuẫn Đạo': {
                    Loại: 'Phòng_cụ', Vị_trí_trang_bị: 'Áo', Tên: 'Lễ Phục Dải Lụa Của Thánh Nữ Tuẫn Đạo', Phẩm_chất: 'Thần_khí', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Thể_chất: 1, Sức_hấp_dẫn: 1, Giảm_sát_thương_vật_lý: 10, Giảm_sát_thương_ma_pháp: 10 },
                    Hiệu_quả: '[Bước nhảy cuối cùng] Khi chịu sát thương, nếu sát thương đó khiến HP giảm xuống 0, đổi thành khóa HP ở 1 và nhận [Vô địch] 1 lượt, mỗi trận chỉ kích hoạt 1 lần;[Dư vận gió triều] Ở hình thái thánh nữ, sát thương khí động +20%.',
                    Mô_tả: 'Lễ phục cải chế từ bộ đồ mặc trong vũ khúc cuối cùng trước khi nhận thánh danh. Khi dải lụa xòe trong gió, nó giống như biển đêm trải rộng',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Kiếm Này Vung Vì Danh Con Người': { Phẩm_chất: 'Thần_khí', Loại: 'Sát_thương', Hiệu_quả: 'Ở hình thái thiếu nữ, nhảy lên đánh bay kẻ địch rồi nện xuống mặt đất, gây [500% + 15% × (Cấp_độ - 1)] sát thương vật lý và gắn 2 tầng [Phong thực]. Ở hình thái thánh nữ, dùng cự kiếm quét ngang phía trước, gây [600% + 18% × (Cấp_độ - 1)] sát thương khí động và lập tức kết toán 1 lần hiệu ứng phong thực (số tầng chỉ -1).', Mô_tả: '\'Thanh kiếm này không vung vì thánh danh.\'Thiếu nữ nhảy lên như khiêu vũ, thánh nữ vung kiếm như triều xuống. Dù ở tư thái nào, mũi kiếm luôn chỉ về người nàng muốn bảo vệ.' },
                'Lưỡi Kiếm Nhìn Triều Giận Gió Gào': { Phẩm_chất: 'Truyền_thuyết', Loại: 'Sát_thương', Hiệu_quả: 'Chỉ dùng được ở hình thái thánh nữ (ngự tỷ trưởng thành ngực lớn). Giải phóng cộng hưởng kép của Tuế Chủ và Minh Thức để chém một đòn toàn lực, gây [800% + 20% × (Cấp_độ - 1)] sát thương khí động. Mỗi khi tiêu hao 1 tầng [Phong thực], sát thương cuối của đòn này tăng thêm 10% (tối đa +50%). Đòn này chắc chắn trúng. Sau khi thi triển trở lại hình thái thiếu nữ, hồi 40% sinh mệnh tối đa.', Mô_tả: 'Ánh huy hoàng Tuế Chủ và vực sâu Minh Thức hợp lưu nơi mũi kiếm. Khoảnh khắc cự kiếm chém xuống, màn trời nứt ra, cuồng phong gầm thét như triều phán quyết nuốt chửng tất cả. Đây là một kiếm nặng nề nhất mà cũng tự do nhất trong hai mươi năm của nàng.' }
            },
            Ngoại_hình: 'Tóc dài màu vàng như ánh trăng xõa tới eo, đôi mắt xanh trong trẻo yên tĩnh. Giữa trán đeo tiara cành lá và giọt nước, tai hơi nhọn. Khi ở hình thái thánh nữ (ngự tỷ trưởng thành ngực lớn), mái tóc dài xõa hẳn, vạt áo trải ra như thủy triều, sắc xanh thẫm và bạc trắng đan thành đường nét thánh khiết mà sắc bén.',
            Trang_phục: 'Lễ phục dải lụa mỏng nhẹ chủ đạo trắng và xanh nhạt; hình thái thiếu nữ mảnh mai nhẹ nhàng, hình thái thánh nữ trang trọng cao thẳng. Sandal dây mảnh và dải lụa bán trong suốt khiến mỗi bước chân như có thể bị gió nâng lên bất cứ lúc nào.',
            Độ_thiện_cảm: 35,
            Lời_thề_đồng_hành: false,
            Tuyệt_kỹ_liên_kết: {
                'Lời Đồng Cầu Của Thủy Triều Và Sao Trời': { Phẩm_chất: 'Sử_thi', Loại: 'Sát_thương', Hiệu_quả: 'Katisia chuyển sang hình thái thánh nữ và giơ cao thánh kiếm, Kẻ Lãng Du rót sức mạnh cộng hưởng vào thân kiếm. Hai người hợp lực chém ra một đòn dung hợp ánh huy hoàng Tuế Chủ và vực sâu Minh Thức, gây [1000% + 25% × (Cấp_độ - 1)] sát thương khí động. Mỗi 1 tầng [Phong thực] mục tiêu đang có khiến ngưỡng bạo kích giảm thêm 1 (tối đa -5); đòn này chắc chắn trúng và sau khi trúng không xóa số tầng phong thực. Khi hạ mục tiêu, Katisia giữ hình thái thánh nữ và tiếp tục hành động 1 lượt. Tiêu hao 100 CP.', Mô_tả: 'Thánh kiếm giơ cao, cộng hưởng của Kẻ Lãng Du như ánh sao rót vào lưỡi kiếm. Khi nàng mở mắt, đôi mắt xanh cùng lúc phản chiếu vực triều và ánh sao:\'Lần này, chúng ta cùng nhau.\'' }
            }
        },
        'Amis': {
            Giới_tính: 'Nữ',
            Ở_gần: true,
            Chủng_tộc: 'Nhân_loại',
            Cấp_độ: 1,
            Thuộc_tính: { Sức_mạnh: 12, Nhanh_nhẹn: 22, Thể_chất: 18, Trí_lực: 22, Cảm_nhận: 16, Sức_hấp_dẫn: 20 },
            Danh_sách_trang_bị: {
                'Sao Mai Vĩnh Viễn': {
                    Loại: 'Vũ_khí', Vị_trí_trang_bị: 'Tay_chính', Tên: 'Sao Mai Vĩnh Viễn', Phẩm_chất: 'Sử_thi', Cấp_độ: 1, Cấp_cường_hóa: 0,
                    Cộng_thêm_thuộc_tính: { Nhanh_nhẹn: 2, Trí_lực: 1, Toàn_kỹ_năng: 2, Sát_thương_bạo_kích: 30 },
                    Hiệu_quả: 'Kiểm định tấn công +2;[Dấu ấn tinh huy] Khi kiếm này đánh trúng mục tiêu, khắc [Tầng lưu quang] lên người mục tiêu: mỗi tầng khiến mục tiêu không thể ẩn nấp trước Amis, đồng thời ngưỡng bạo kích của Amis khi tấn công mục tiêu -1, tối đa cộng dồn 3 tầng (ngưỡng bạo kích tối đa -3), kéo dài tới hết chiến đấu;[Lưu quang thừa khải] Kích hoạt khi người cầm chuyển hình thái chiến đấu, thân kiếm tái tạo theo đó: hình thái người hóa thành trọng thứ kiếm lưu quang, hình thái cơ binh hóa thành trọng trường mâu xuyên trời, đồng thời lập tức thanh toán [Tầng lưu quang] tích lũy trên mục tiêu chính: tiêu hao N tầng gây [1000% + 25% × (Cấp_độ-1)] × N÷3 sát thương thuộc tính ánh sáng (làm tròn tới 10 gần nhất, đủ 3 tầng là đủ mức), sau khi kích hoạt xóa sạch số tầng lưu quang của mục tiêu;[Tinh hải quy hàng] Hành động phụ, phát ra một luồng lưu quang khóa một đồng minh trong tầm nhìn, lập tức dịch chuyển người đó tới vị trí liền kề bên Amis, quá trình dịch chuyển không kích hoạt tấn công cơ hội và bẫy.',
                    Mô_tả: 'Kiếm tên "Khải Minh", là kết tinh Amis dùng chấp niệm tái tạo từ dòng dữ liệu vỡ nát khi một mình trôi dạt mười năm trong sâu thẳm không gian hư chất. Thân kiếm quấn ánh sao vụn không bao giờ tắt, lưu chuyển theo cảm xúc người cầm: bình tĩnh như dòng Ngân Hà chảy chậm, khi kịch chiến như sao băng bắn tóe; tồn tại hiểu "tần số" có thể đọc được chấp niệm sâu nhất trong đó. Nó sẽ tự động biến đổi theo hình thái chiến đấu của người cầm: ở hình thái người là trọng thứ kiếm lưu quang, sau khi khởi động binh trang Ẩn Giả biến thành cơ binh thì hóa thành trọng trường mâu xuyên thủng trời cao. Khi trong lòng nàng hiện lên ý nghĩ "muốn thắp sáng đường về cho một ai đó", ánh kiếm vẫn không tắt trong đêm đen sâu nhất. Đây là lời hứa vô thanh của nàng với Kẻ Lãng Du.',
                    Hòm_trang_bị: false
                }
            },
            Kỹ_năng: {
                'Bay Tới Lúc Khải Minh': { Phẩm_chất: 'Thần_khí', Loại: 'Sát_thương', Hiệu_quả: 'Có hình thức tấn công khác nhau tùy hình thái. Hình thái người: sau khi tụ lực, lao tới mục tiêu chém một nhát, gây [500% + 15% × (Cấp_độ - 1)] sát thương vật lý và gắn 2 tầng [Dấu lưu quang]. Hình thái cơ binh: giơ tay dẫn lưu quang từ dưới lên hóa thành kiếm nhận bay lên, rồi kiếm nhận phá không rơi xuống, gây [600% + 18% × (Cấp_độ - 1)] sát thương thuộc tính lửa và gắn 3 tầng [Dấu lưu quang].', Mô_tả: 'Ánh kiếm cắt đêm, quét sạch tai ách!' },
                'Tinh Huy Phá Giới Mà Đến': { Phẩm_chất: 'Truyền_thuyết', Loại: 'Sát_thương', Hiệu_quả: 'Chỉ có thể dùng sau khi "Bay tới lúc Khải Minh" đã được thi triển 2 lần trong trận này. Triệu hồi hình chiếu Ẩn Giả (Gundam khổng lồ) phá mở màn trời, cắm xuống cự kiếm cơ giới như núi để hủy diệt kẻ địch, gây [800% + 20% × (Cấp_độ - 1)] sát thương thuộc tính lửa. Mỗi khi tiêu hao 1 tầng [Dấu lưu quang], sát thương cuối của đòn này tăng thêm 10% (tối đa +50%). Đòn này chắc chắn trúng.', Mô_tả: 'Hình chiếu Ẩn Giả khổng lồ giáng xuống từ trời cao, cự kiếm cơ giới rơi như núi. Binh trang Ẩn Giả: chế độ cánh sáng triển khai. Amis: Đêm nay biển sao sáng trong!' }
            },
            Ngoại_hình: 'Tóc dài hồng nhạt buộc đuôi ngựa cao, quanh tóc lơ lửng vòng hào quang công nghệ. Đồng tử hình sao chữ thập màu vàng hổ phách, khi cười mắt cong như trăng non. Vai trái điểm một nốt ruồi đen. Ở hình thái cơ binh, toàn thân bạc trắng, lưng mọc cánh máy, như một pháo đài trên không nhẹ nhàng.',
            Trang_phục: 'Đồ bó chiến đấu trắng thuần phong cách idol cải biên, vai và cổ để lộ phóng khoáng, áo quây da bóng trắng siết ra khuôn ngực đầy đặn, chính giữa ngực mở rộng để lộ khe ngực, lưng gần như để trần. Phần dưới là bodysuit xẻ cao quấn váy đuôi én bất đối xứng; hai chân bất đối xứng: chân trái là bốt tất dài trắng kéo tới gốc đùi, chân phải chỉ buộc vòng chân vàng, đi bốt cao gót cổ ngắn màu trắng. Hai tay đeo găng chiến thuật ống dài màu trắng, dài quá khuỷu tay.',
            Độ_thiện_cảm: 35,
            Lời_thề_đồng_hành: true,
            Tuyệt_kỹ_liên_kết: {
                'Hướng Tới Ngôi Sao Chưa Được Thắp Sáng': { Phẩm_chất: 'Sử_thi', Loại: 'Sát_thương', Hiệu_quả: 'Tiêu hao 100 CP. Amis triệu hồi hình chiếu Ẩn Giả (Gundam khổng lồ) trên không chiến trường, cùng <user> hóa thành lưu quang vào buồng lái Ẩn Giả để cùng điều khiển. Trong thời gian này, hai người miễn nhiễm mọi tấn công và khống chế của kẻ địch, duy trì tối đa 2 lượt; nếu dùng Ẩn Giả phát động tổng cộng 3 lần tấn công trong thời gian đó thì lập tức giải trừ. Mỗi đòn tấn công của Ẩn Giả gây [1000% + 20% × (Cấp_độ-1)] sát thương thuộc tính lửa, chắc chắn trúng.', Mô_tả: 'Giới hạn cơ thể được giải trừ, thời khắc cứu thế đã tới!' }
            }
        }
    };

    function getStarterTeammateTemplate(bondName) {
        return STARTER_TEAMMATE_TEMPLATE_MAP[String(bondName || '').trim()] || null;
    }

    function syncStarterTeammateEquipLevels(equipList, level) {
        Object.values(equipList || {}).forEach(item => {
            if (!item || typeof item !== 'object') return;
            item.Cấp_độ = level;
            if (item.Cấp_cường_hóa === undefined || item.Cấp_cường_hóa === null) item.Cấp_cường_hóa = 0;
            if (item.Hòm_trang_bị === undefined) item.Hòm_trang_bị = false;
        });
    }

    function applyStarterTeammateTemplateToBond(bondName, bond) {
        const template = getStarterTeammateTemplate(bondName);
        if (!template || !bond || typeof bond !== 'object') return false;

        const currentLevel = Math.max(1, safeParseInt(bond.Cấp_độ, safeParseInt(template.Cấp_độ, 1)));
        const equippedList = clonePlainValue(template.Danh_sách_trang_bị || {});
        syncStarterTeammateEquipLevels(equippedList, currentLevel);

        bond.Giới_tính = template.Giới_tính ?? bond.Giới_tính;
        bond.Ở_gần = template.Ở_gần !== false;
        bond.Chủng_tộc = template.Chủng_tộc ?? bond.Chủng_tộc;
        bond.Cấp_độ = currentLevel;
        bond.Thuộc_tính = clonePlainValue(template.Thuộc_tính || {});
        bond.Danh_sách_trang_bị = equippedList;
        bond.Kỹ_năng = clonePlainValue(template.Kỹ_năng || {});
        bond.Ngoại_hình = template.Ngoại_hình || '';
        bond.Trang_phục = template.Trang_phục || '';
        if (template.Độ_thiện_cảm !== undefined) bond.Độ_thiện_cảm = safeParseInt(template.Độ_thiện_cảm, safeParseInt(bond.Độ_thiện_cảm, 0));
        if (template.Lời_thề_đồng_hành !== undefined) bond.Lời_thề_đồng_hành = template.Lời_thề_đồng_hành === true;
        if (template.Tuyệt_kỹ_liên_kết && typeof template.Tuyệt_kỹ_liên_kết === 'object') {
            bond.Tuyệt_kỹ_liên_kết = clonePlainValue(template.Tuyệt_kỹ_liên_kết);
        }
        return true;
    }

    function applyStarterTeammateTemplatesOnNewBonds(statData, statDataBefore) {
        const bonds = statData?.Danh_sách_ràng_buộc;
        if (!bonds || typeof bonds !== 'object') return;

        const beforeMap = (statDataBefore?.Danh_sách_ràng_buộc && typeof statDataBefore.Danh_sách_ràng_buộc === 'object')
            ? statDataBefore.Danh_sách_ràng_buộc
            : {};

        Object.entries(bonds).forEach(([bondName, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (beforeMap[bondName] !== undefined) return;
            if (!getStarterTeammateTemplate(bondName)) return;
            if (applyStarterTeammateTemplateToBond(bondName, bond)) {
                console.log(`[Chặn đồng đội mở đầu] ${bondName} đăng ký mới, đã ghi đè theo template mở đầu và đồng bộ cấp độ ${bond.Cấp_độ}`);
            }
        });
    }

    function getBriefDisplayPathList(statData) {
        const paths = statData?.Cấu_hình_hệ_thống?.Hiển_thị_tóm_tắt_chi_tiết?.Đường_dẫn_hiển_thị_tóm_tắt;
        return Array.isArray(paths) ? paths.filter(path => typeof path === 'string' && path.trim()) : [];
    }

    function getBriefBondNameSet(statData) {
        const names = new Set();
        getBriefDisplayPathList(statData).forEach(path => {
            const normalized = path.trim();
            if (!normalized.startsWith(BOND_BRIEF_PATH_PREFIX)) return;
            const name = normalized.slice(BOND_BRIEF_PATH_PREFIX.length).trim();
            if (name) names.add(name);
        });
        return names;
    }

    function isBondBriefDisplay(statData, bondName) {
        return getBriefBondNameSet(statData).has(String(bondName || '').trim());
    }

    function guardBriefDisplayBonds(statData, statDataBefore) {
        if (!statDataBefore) return;
        const frozenBondNames = getBriefBondNameSet(statData);
        if (frozenBondNames.size <= 0) return;

        const bonds = statData?.Danh_sách_ràng_buộc;
        const oldBonds = statDataBefore?.Danh_sách_ràng_buộc;
        if (!bonds || typeof bonds !== 'object') return;
        if (!oldBonds || typeof oldBonds !== 'object') return;

        frozenBondNames.forEach(name => {
            const oldBond = oldBonds[name];
            const newBond = bonds[name];
            if (oldBond === undefined) {
                if (newBond !== undefined) {
                    delete bonds[name];
                    console.warn(`[Bảo vệ biến] ⚠️ hiển thị tóm tắt ràng buộc "${name}" không tồn tại ở khung trước, đã xóa dữ liệu mới thêm`);
                }
                return;
            }
            if (hasChanged(oldBond, newBond)) {
                bonds[name] = clonePlainValue(oldBond);
                console.warn(`[Bảo vệ biến] ⚠️ hiển thị tóm tắt ràng buộc "${name}" bị sửa, đã rollback toàn bộ và khóa`);
            }
        });
    }

    function guardProtectedFields(statData, statDataBefore) {
        if (!statDataBefore) return;
        console.log(`[Bảo vệ biếndebug] bắt đầu kiểm tra, PROTECTED_PATHS=${JSON.stringify(PROTECTED_PATHS)}`);
        for (const path of PROTECTED_PATHS) {
            const oldVal = getByPath(statDataBefore, path);
            const newVal = getByPath(statData, path);
            console.log(`[Bảo vệ biếndebug] ${path}: old=${JSON.stringify(oldVal)}, new=${JSON.stringify(newVal)}, changed=${hasChanged(oldVal, newVal)}`);
            if (oldVal !== undefined && hasChanged(oldVal, newVal)) {
                console.warn(`[Bảo vệ biến] ⚠️ trường được bảo vệ bị bên ngoài sửa: ${path} (${JSON.stringify(oldVal)} → ${JSON.stringify(newVal)}),đã rollback`);
                setByPath(statData, path, oldVal);
            }
        }

        guardBriefDisplayBonds(statData, statDataBefore);
        applyStarterTeammateTemplatesOnNewBonds(statData, statDataBefore);

        // Bảo vệ thêm trang bị: chỉ chặn trường hợp trang bị mới có vị trí mặc định sai
        // quy tắc: nếu trang bị mới có Hòm_trang_bị=false,tự động sửa thành true;
        // không xử lý trang bị đã có, tránh ảnh hưởng thay đổi hợp lệ của trang bị cũ trong cập nhật sau.
        const oldEquipList = statDataBefore?.Nhân_vật?.Danh_sách_trang_bị || {};
        const newEquipList = statData?.Nhân_vật?.Danh_sách_trang_bị || {};
        for (const [equipKey, equipVal] of Object.entries(newEquipList)) {
            if (!equipVal || typeof equipVal !== 'object') continue;
            const isNewEquip = oldEquipList[equipKey] === undefined;
            if (isNewEquip) {
                const equipName = (typeof equipVal.Tên === 'string') ? equipVal.Tên.trim() : '';
                if (!equipName) {
                    equipVal.Tên = equipKey;
                    console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" Têntrống, đã tự động điền lại bằng tên key`);
                }
                sanitizeNewEquipCoreAttrBonuses(equipKey, equipVal);
            }
            if (isNewEquip && equipVal.Hòm_trang_bị === false) {
                equipVal.Hòm_trang_bị = true;
                console.warn(`[Bảo vệ biến] ⚠️ Trang bị mới "${equipKey}" có Hòm_trang_bị là false, đã tự động sửa thành true`);
            }
        }
    }

    function collectEquippedReductionContrib(player) {
        const Danh_sách_trang_bị = player?.Danh_sách_trang_bị || {};
        let physDefense = 0;
        let magDefense = 0;
        let physBonus = 0;
        let magBonus = 0;

        Object.values(Danh_sách_trang_bị).forEach(item => {
            if (!item || !item.Tên || item.Hòm_trang_bị) return;

            const bonuses = item.Cộng_thêm_thuộc_tính || {};
            physBonus += safeParseFloat(bonuses['Giảm_sát_thương_vật_lý'], 0);
            magBonus += safeParseFloat(bonuses['Giảm_sát_thương_ma_pháp'], 0);

            if ((item.Loại === 'Phòng_cụ' || isShieldLikeEquip(item)) && !isSpecialEquippedItem(item)) {
                const armorSlot = isShieldLikeEquip(item) ? 'Khiên' : getEquipStoredSlot(item);
                physDefense += getArmorDefenseValue(item, armorSlot || item.Vị_trí_trang_bị);
            } else if (item.Loại === 'Trang_sức') {
                if (!isSpecialEquippedItem(item)) {
                    magDefense += getAccessoryDefenseValue(item, getEquipStoredSlot(item) || item.Vị_trí_trang_bị);
                }
            }
        });

        const physFromDefense = defenseToReductionPercent(physDefense, PHYS_DEF_FULL_SCALE);
        const magFromDefense = defenseToReductionPercent(magDefense, MAG_DEF_FULL_SCALE);

        return {
            physDefense,
            magDefense,
            physBonus,
            magBonus,
            physFromDefense,
            magFromDefense
        };
    }

    // chỉ ghi lại giảm sát thương khi trang bị thay đổi, tránh ghi đè buff tạm không đến từ trang bị
    function calculateDamageReductions(player, playerBefore) {
        if (!player) return;
        if (!player.Thuộc_tính_chiến_đấu) player.Thuộc_tính_chiến_đấu = {};
        const combat = player.Thuộc_tính_chiến_đấu;

        const curr = collectEquippedReductionContrib(player);
        const currEquipPhys = curr.physBonus + curr.physFromDefense;
        const currEquipMag = curr.magBonus + curr.magFromDefense;

        let basePhys = 0;
        let baseMag = 0;

        if (playerBefore) {
            const prevCombat = playerBefore.Thuộc_tính_chiến_đấu || {};
            const prev = collectEquippedReductionContrib(playerBefore);
            const prevEquipPhys = prev.physBonus + prev.physFromDefense;
            const prevEquipMag = prev.magBonus + prev.magFromDefense;
            basePhys = safeParseFloat(prevCombat.Giảm_sát_thương_vật_lý, 0) - prevEquipPhys;
            baseMag = safeParseFloat(prevCombat.Giảm_sát_thương_ma_pháp, 0) - prevEquipMag;
        } else {
            // lần đầu bù đáy: cố suy ngược giảm sát thương cơ bản không từ trang bị từ giá trị hiện tại
            basePhys = safeParseFloat(combat.Giảm_sát_thương_vật_lý, 0) - currEquipPhys;
            baseMag = safeParseFloat(combat.Giảm_sát_thương_ma_pháp, 0) - currEquipMag;
        }

        basePhys = clamp(basePhys, 0, DAMAGE_REDUCTION_CAP);
        baseMag = clamp(baseMag, 0, DAMAGE_REDUCTION_CAP);

        const newPhys = clamp(Math.round(basePhys + currEquipPhys), 0, DAMAGE_REDUCTION_CAP);
        const newMag = clamp(Math.round(baseMag + currEquipMag), 0, DAMAGE_REDUCTION_CAP);

        if (safeParseFloat(combat.Giảm_sát_thương_vật_lý, 0) !== newPhys) {
            console.log(`[tính giảm sát thương] Giảm_sát_thương_vật_lý: ${combat.Giảm_sát_thương_vật_lý} → ${newPhys} (Cơ_bản${basePhys.toFixed(2)} + dòng thuộc tính${curr.physBonus.toFixed(2)} + mapping phòng ngự${curr.physFromDefense})`);
            combat.Giảm_sát_thương_vật_lý = newPhys;
        }
        if (safeParseFloat(combat.Giảm_sát_thương_ma_pháp, 0) !== newMag) {
            console.log(`[tính giảm sát thương] Giảm_sát_thương_ma_pháp: ${combat.Giảm_sát_thương_ma_pháp} → ${newMag} (Cơ_bản${baseMag.toFixed(2)} + dòng thuộc tính${curr.magBonus.toFixed(2)} + mapping phòng ngự${curr.magFromDefense})`);
            combat.Giảm_sát_thương_ma_pháp = newMag;
        }
    }

    function calculateBondMaxHP(bond, bondName, options = {}) {
        if (!bond) return;
        const initMissingCurrentHp = options.initMissingCurrentHp === true;

        const Cấp_độ = safeParseInt(bond.Cấp_độ, 1);
        const Thể_chất = safeParseInt(bond.Thuộc_tính?.Thể_chất, 10);
        const Chủng_tộc = bond.Chủng_tộc || '';

        let equipHpBonus = 0;
        const Danh_sách_trang_bị = bond.Danh_sách_trang_bị || {};
        Object.values(Danh_sách_trang_bị).forEach(item => {
            if (!item || !item.Tên || item.Hòm_trang_bị) return;
            const bonuses = item.Cộng_thêm_thuộc_tính || {};
            equipHpBonus += safeParseInt(bonuses['Giới_hạn_sinh_mệnh'], 0);
        });

        let newMaxHP;
        if (Chủng_tộc === 'Cự_nhân_chủng') {
            newMaxHP = Cấp_độ * Thể_chất * 3 + equipHpBonus;
        } else {
            newMaxHP = Cấp_độ * Thể_chất * 2 + equipHpBonus;
        }
        newMaxHP = Math.max(newMaxHP, 1);

        const oldMaxHP = safeParseInt(bond.Giới_hạn_sinh_mệnh, 0);
        const oldCurrentHP = safeParseInt(bond.Sinh_mệnh_hiện_tại, 0);

        if (oldMaxHP !== newMaxHP) {
            bond.Giới_hạn_sinh_mệnh = newMaxHP;
            console.log(`[HP ràng buộc] ${bondName} Giới_hạn_sinh_mệnh ${oldMaxHP} → ${newMaxHP}`);

            if (oldMaxHP > 0 && oldCurrentHP > 0) {
                const hpRatio = oldCurrentHP / oldMaxHP;
                const newCurrentHP = Math.max(1, Math.round(hpRatio * newMaxHP));
                bond.Sinh_mệnh_hiện_tại = Math.min(newCurrentHP, newMaxHP);
                console.log(`[HP ràng buộc] ${bondName} sửa theo tỷ lệ: ${oldCurrentHP} → ${bond.Sinh_mệnh_hiện_tại} (${Math.round(hpRatio * 100)}%)`);
            } else if (initMissingCurrentHp && (bond.Sinh_mệnh_hiện_tại === undefined || bond.Sinh_mệnh_hiện_tại === null)) {
                bond.Sinh_mệnh_hiện_tại = newMaxHP;
                console.log(`[HP ràng buộc] ${bondName} ThiếuSinh_mệnh_hiện_tại,đã khởi tạo thành ${newMaxHP}`);
            } else if (oldCurrentHP > newMaxHP) {
                bond.Sinh_mệnh_hiện_tại = newMaxHP;
            }
            return;
        }

        // khi giới hạn sinh mệnh không đổi, chỉ bù trường thiếu
        if (initMissingCurrentHp && (bond.Sinh_mệnh_hiện_tại === undefined || bond.Sinh_mệnh_hiện_tại === null)) {
            bond.Sinh_mệnh_hiện_tại = newMaxHP;
            console.log(`[HP ràng buộc] ${bondName} ThiếuSinh_mệnh_hiện_tại,đã khởi tạo thành ${newMaxHP}`);
        }
    }

    function ensureAllBondsThresholdCorrect(statData, playerName) {
        const bonds = statData?.Danh_sách_ràng_buộc;
        if (!bonds || typeof bonds !== 'object') return;

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (name === playerName) return;
            if (!isBondShareExpEnabled(bond)) return;

            const bondLevel = safeParseInt(bond.Cấp_độ, 1);
            const levelBaseExp = getLevelBaseTotalExp(bondLevel);
            const parsedExp = parseFloat(bond.Tổng_kinh_nghiệm_hiện_tại);
            
            // sửa Tổng_kinh_nghiệm_hiện_tại
            if (bond.Tổng_kinh_nghiệm_hiện_tại === undefined || bond.Tổng_kinh_nghiệm_hiện_tại === null || isNaN(parsedExp)) {
                bond.Tổng_kinh_nghiệm_hiện_tại = levelBaseExp;
                console.log(`[sửa ràng buộc] ${name} ThiếuTổng_kinh_nghiệm_hiện_tại,đã theo Lv.${bondLevel} khởi tạo thành ${levelBaseExp}`);
            } else if (parsedExp < levelBaseExp) {
                bond.Tổng_kinh_nghiệm_hiện_tại = levelBaseExp;
                console.log(`[sửa ràng buộc] ${name} Tổng_kinh_nghiệm_hiện_tạiquá thấp(${parsedExp}),đã theo Lv.${bondLevel} sửa thành ${levelBaseExp}`);
            }

            // sửa Ngưỡng_lên_cấp (quan trọng: kiểm tra ngưỡng có khớp Cấp_độ không)
            const correctThreshold = calculateDiabloThreshold(bondLevel + 1);
            const parsedThreshold = safeParseFloat(bond.Ngưỡng_lên_cấp, 0);
            if (bond.Ngưỡng_lên_cấp === undefined || bond.Ngưỡng_lên_cấp === null || parsedThreshold !== correctThreshold) {
                const oldThreshold = parsedThreshold || 'Thiếu';
                bond.Ngưỡng_lên_cấp = correctThreshold;
                console.log(`[sửa ràng buộc] ${name} Lv.${bondLevel} Ngưỡng_lên_cấplỗi(${oldThreshold}),đã sửa thành ${correctThreshold}`);
            }
        });
    }

    function ensureNearbyBondCompatFields(statData, playerName) {
        const bonds = statData?.Danh_sách_ràng_buộc;
        if (!bonds || typeof bonds !== 'object') return;

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (bond.Ở_gần !== true) return;
            if (name === playerName) return;

            const missingHp = bond.Giới_hạn_sinh_mệnh === undefined || bond.Giới_hạn_sinh_mệnh === null ||
                safeParseInt(bond.Giới_hạn_sinh_mệnh, 0) <= 0 ||
                bond.Sinh_mệnh_hiện_tại === undefined || bond.Sinh_mệnh_hiện_tại === null;
            if (missingHp) {
                calculateBondMaxHP(bond, name, { initMissingCurrentHp: true });
            }
        });
    }

    function ensureNewBondHpInitialized(statData, statDataBefore, playerName) {
        const bonds = statData?.Danh_sách_ràng_buộc;
        if (!bonds || typeof bonds !== 'object') return;

        const bondsBefore = statDataBefore?.Danh_sách_ràng_buộc;
        const beforeMap = (bondsBefore && typeof bondsBefore === 'object') ? bondsBefore : {};

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (name === playerName) return;

            const existedBefore = beforeMap[name] && typeof beforeMap[name] === 'object';
            if (existedBefore) return;

            const hpLooksLikeSchemaDefault =
                safeParseInt(bond.Giới_hạn_sinh_mệnh, 0) <= 1 &&
                safeParseInt(bond.Sinh_mệnh_hiện_tại, 0) <= 0;

            calculateBondMaxHP(bond, name, { initMissingCurrentHp: true });
            if (hpLooksLikeSchemaDefault && safeParseInt(bond.Sinh_mệnh_hiện_tại, 0) <= 0) {
                bond.Sinh_mệnh_hiện_tại = Math.max(safeParseInt(bond.Giới_hạn_sinh_mệnh, 1), 1);
                console.log(`[đăng ký ràng buộc] ${name} phát hiện HP mặc định, đã khởi tạo đầy máu ${bond.Sinh_mệnh_hiện_tại}/${bond.Giới_hạn_sinh_mệnh}`);
            }

            const bondLevel = safeParseInt(bond.Cấp_độ, 1);
            const levelBaseExp = getLevelBaseTotalExp(bondLevel);
            const parsedExp = parseFloat(bond.Tổng_kinh_nghiệm_hiện_tại);
            if (bond.Tổng_kinh_nghiệm_hiện_tại === undefined || bond.Tổng_kinh_nghiệm_hiện_tại === null || isNaN(parsedExp) || parsedExp < levelBaseExp) {
                const oldExpText = (bond.Tổng_kinh_nghiệm_hiện_tại === undefined || bond.Tổng_kinh_nghiệm_hiện_tại === null || isNaN(parsedExp))
                    ? 'Thiếu'
                    : parsedExp;
                bond.Tổng_kinh_nghiệm_hiện_tại = levelBaseExp;
                console.log(`[đăng ký ràng buộc] ${name} Tổng_kinh_nghiệm_hiện_tại(${oldExpText})đã theo Lv.${bondLevel} khởi tạo thành ${levelBaseExp}`);
            }

            const parsedThreshold = safeParseFloat(bond.Ngưỡng_lên_cấp, 0);
            if (bond.Ngưỡng_lên_cấp === undefined || bond.Ngưỡng_lên_cấp === null || parsedThreshold <= 0) {
                bond.Ngưỡng_lên_cấp = calculateDiabloThreshold(bondLevel + 1);
                console.log(`[đăng ký ràng buộc] ${name} ThiếuNgưỡng_lên_cấp,đã khởi tạo thành ${bond.Ngưỡng_lên_cấp}`);
            }
            console.log(`[đăng ký ràng buộc] ${name} đăng ký mới, đã hoàn tất khởi tạo cơ bản`);
        });
    }

    // ==========================================
    // kiểm tra ngày sản lượng kinh doanh và đẩy việc cần làm
    // ==========================================

    const CALENDAR_DATE_REGEX = /^(.*?)(\d+) năm (\d+) tháng (\d+) ngày $/;
    const DAY_MS = 24 * 60 * 60 * 1000;

    function parseCalendarDate(text) {
        if (typeof text !== 'string') return null;
        const raw = text.trim();
        if (!raw) return null;
        const m = raw.match(CALENDAR_DATE_REGEX);
        if (!m) return null;

        const prefix = (m[1] || '').trim() || 'Lịch Arad';
        const year = safeParseInt(m[2], NaN);
        const month = safeParseInt(m[3], NaN);
        const day = safeParseInt(m[4], NaN);
        if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
        if (month < 1 || month > 12 || day < 1 || day > 31) return null;

        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCFullYear() !== year || date.getUTCMonth() !== (month - 1) || date.getUTCDate() !== day) {
            return null;
        }
        return { prefix, date, year, month, day };
    }

    function formatCalendarDate(prefix, date) {
        const y = date.getUTCFullYear();
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        return `${prefix || 'Lịch Arad'}${y} năm ${m} tháng ${d} ngày `;
    }

    function addDaysToCalendarDate(date, days) {
        const next = new Date(date.getTime());
        next.setUTCDate(next.getUTCDate() + days);
        return next;
    }

    function getCalendarDayDiff(laterDate, earlierDate) {
        const left = Date.UTC(laterDate.getUTCFullYear(), laterDate.getUTCMonth(), laterDate.getUTCDate());
        const right = Date.UTC(earlierDate.getUTCFullYear(), earlierDate.getUTCMonth(), earlierDate.getUTCDate());
        return Math.floor((left - right) / DAY_MS);
    }

    function hasEffectiveProduction(outputText) {
        if (typeof outputText !== 'string') return false;
        const text = outputText.trim();
        if (!text) return false;
        const normalized = text.replace(/\s+/g, '');
        const emptyWords = new Set(['Không', 'Tạm thời chưa có', 'Không có sản lượng', 'Trống', 'none', 'null', 'Không có lợi nhuận', 'Tạm thời chưa có lợi nhuận']);
        return !emptyWords.has(normalized.toLowerCase());
    }

    function detectProductionCycleDays(outputText) {
        const text = (outputText || '').toString();
        if (/hằng ngày|mỗi ngày|ngày|kết ngày|mỗi 1 ngày/i.test(text)) return 1;
        if (/hằng tháng|mỗi tháng|sản lượng tháng|kết tháng|mỗi 30 ngày/i.test(text)) return 30;
        if (/hằng tuần|mỗi tuần|sản lượng tuần|kết tuần|mỗi 7 ngày/i.test(text)) return 7;
        return 7;
    }

    function syncAssetProductionSchedules(statData) {
        const assets = statData?.Tài_sản_cốt_lõi;
        if (!assets || typeof assets !== 'object') return;

        const worldCalendar = statData?.Thông_tin_thế_giới?.Niên_lịch;
        const nowParsed = parseCalendarDate(worldCalendar);
        if (!nowParsed) {
            console.warn(`[kết toán kinh doanh] định dạng Niên_lịch hiện tại không thể phân tích: ${worldCalendar}`);
            return;
        }
        const nowDate = nowParsed.date;
        const datePrefix = nowParsed.prefix || 'Lịch Arad';

        Object.entries(assets).forEach(([assetName, asset]) => {
            if (!asset || typeof asset !== 'object') return;

            if (!Array.isArray(asset.Sự_kiện_chờ_xử_lý)) {
                asset.Sự_kiện_chờ_xử_lý = [];
            }

            const seqMap = asset.Chuỗi_xây_dựng;
            if (!seqMap || typeof seqMap !== 'object') return;

            const overdueLines = [];
            Object.entries(seqMap).forEach(([seqName, seq]) => {
                if (!seq || typeof seq !== 'object') return;

                const outputText = (typeof seq.Sản_lượng === 'string') ? seq.Sản_lượng.trim() : '';
                const hasOutput = hasEffectiveProduction(outputText);
                const cycleDays = detectProductionCycleDays(outputText);
                const nextDateRaw = (typeof seq.Ngày_sản_lượng_kế_tiếp === 'string') ? seq.Ngày_sản_lượng_kế_tiếp.trim() : '';
                const nextDateParsed = parseCalendarDate(nextDateRaw);

                if (!nextDateParsed) {
                    if (hasOutput) {
                        seq.Ngày_sản_lượng_kế_tiếp = formatCalendarDate(datePrefix, addDaysToCalendarDate(nowDate, cycleDays));
                    }
                    return;
                }

                const overdueDays = getCalendarDayDiff(nowDate, nextDateParsed.date);
                // chỉ xử lý entry quá hạn ít nhất 2 ngày mà AI vẫn chưa làm mới ngày, để tránh xung đột
                if (overdueDays < 2) return;
                if (!hasOutput) return;

                overdueLines.push(`${seqName}→${outputText}`);
                seq.Ngày_sản_lượng_kế_tiếp = formatCalendarDate(datePrefix, addDaysToCalendarDate(nowDate, cycleDays));
            });

            if (overdueLines.length > 0) {
                const location = (typeof asset.Nơi_tọa_lạc === 'string' && asset.Nơi_tọa_lạc.trim()) ? asset.Nơi_tọa_lạc.trim() : 'Địa điểm chưa biết';
                const todoText = `[kết toán kinh doanh tới hạn]${assetName}(${location}):${overdueLines.join(';')}`;
                const exists = asset.Sự_kiện_chờ_xử_lý.some(v => typeof v === 'string' && v === todoText);
                if (!exists) {
                    asset.Sự_kiện_chờ_xử_lý.push(todoText);
                    console.log(`[kết toán kinh doanh] ${assetName} phát hiện${overdueLines.length}mục sản lượng quá hạn, đã đẩy vào việc cần làm và làm mới Ngày_sản_lượng_kế_tiếp`);
                }
            }
        });
    }

    // ==========================================
    // logic chính
    // ==========================================

    let is_initialized_log = false;

    /**
     * cờ chống vào lại: ngăn script sửa stat_data rồi kích hoạt schema reconciliation
     * vào lại VARIABLE_UPDATE_ENDED gây vòng lặp vô hạn
     */
    let isProcessing = false;

    function handleExperienceProcessing(rawVariables, rawVariablesBefore) {
        // chống vào lại: nếu đang xử lý thì bỏ qua trực tiếp
        if (isProcessing) {
            console.log('[Hỗ_trợscript] ⚠️ chặn vào lại, bỏ qua lần xử lý này');
            return;
        }
        isProcessing = true;

        try {
            const statData = rawVariables?.stat_data;
            const statDataBefore = rawVariablesBefore?.stat_data;

            if (!statData) return;

            const player = statData.Nhân_vật;
            if (!player) return;

            // ★ rollback trường được bảo vệ trước, rồi thực hiện tính toán tiếp theo
            guardProtectedFields(statData, statDataBefore);

            // log khởi tạo (chỉ in một lần)
            if (!is_initialized_log) {
                console.log('[Hỗ_trợscript] MVU kết nối biến thành công');
                is_initialized_log = true;
            }

            // ---- phát hiện thay đổi: chỉ xử lý module thực sự thay đổi ----

            const playerBefore = statDataBefore?.Nhân_vật;
            
            // sửa Ngưỡng_lên_cấp của mọi ràng buộc trước (bất kể không ở gần hay không phải đăng ký mới)
            ensureAllBondsThresholdCorrect(statData, player?.Tên || '');
            ensureNewBondHpInitialized(statData, statDataBefore, player?.Tên || '');
            ensureNearbyBondCompatFields(statData, player?.Tên || '');
            // kiểm tra sản lượng kinh doanh tới hạn(chỉ xử lý quá hạn>=2ngày, tránh xung đột với cập nhật thời gian thực của AI)
            syncAssetProductionSchedules(statData);
            const playerExpBefore = safeParseFloat(playerBefore?.Tổng_kinh_nghiệm_hiện_tại, 0);
            const playerExpNow = safeParseFloat(player.Tổng_kinh_nghiệm_hiện_tại, 0);
            const playerExpDelta = playerExpNow - playerExpBefore;

            if (playerBefore && playerExpDelta !== 0) {
                console.log(`[phân phát kinh nghiệm] nhân vật chínhkinh nghiệm thay đổi: ${playerExpBefore} → ${playerExpNow} (Δ${playerExpDelta})`);
            }

            // giá trị kinh nghiệm/Cấp_độ thay đổi -> logic lên cấp
            if (!playerBefore ||
                player.Tổng_kinh_nghiệm_hiện_tại !== playerBefore.Tổng_kinh_nghiệm_hiện_tại ||
                player.Cấp_độ !== playerBefore.Cấp_độ) {
                processLevelUp(player);
            }

            // mỗi lần cập nhật biến đều hiệu chỉnh Cấp_độ của Hiiro, sửa dữ liệu bẩn cũ và bảo đảm khớp với Cấp_độ người chơi
            upgradeHiWeaponQuality(player);

            // nhân vật chínhsau khi nhận kinh nghiệm, đồng bộ kinh nghiệm cho đồng đội ràng buộc đủ điều kiện:
            // cấp 60 trở xuống mọi ràng buộc cùng chia sẻ, trên cấp 60 vẫn chỉ giới hạn đồng đội ở gần
            if (playerBefore && playerExpDelta > 0) {
                shareExpToEligibleBonds(statData, playerExpDelta, player);
            }

            const equipChanged = !playerBefore || hasChanged(player.Danh_sách_trang_bị, playerBefore.Danh_sách_trang_bị);
            if (equipChanged && playerBefore) {
                syncCoreAttrsOnEquipChange(player, playerBefore, 'nhân vật chính');
            }

            // Cấp_độ/Thể_chất/trang bị thay đổi -> tính lại giới hạn HP
            if (!playerBefore ||
                player.Cấp_độ !== playerBefore.Cấp_độ ||
                player.Thuộc_tính?.Thể_chất !== playerBefore.Thuộc_tính?.Thể_chất ||
                equipChanged) {
                calculateMaxHP(player);
            }

            // Danh_sách_trang_bịthay đổi -> tính lại trị số trang bị
            calculateAllEquipmentStats(statData);

            const bonds = statData.Danh_sách_ràng_buộc;
            const bondsBefore = statDataBefore?.Danh_sách_ràng_buộc;
            if (bonds && typeof bonds === 'object') {
                Object.entries(bonds).forEach(([name, bond]) => {
                    if (!bond || typeof bond !== 'object') return;
                    const bondBefore = bondsBefore && typeof bondsBefore === 'object' ? bondsBefore[name] : null;
                    const bondEquipChanged = !bondBefore || hasChanged(bond.Danh_sách_trang_bị, bondBefore.Danh_sách_trang_bị);
                    const bondAttrChanged = !bondBefore || hasActorCoreAttrChanged(bond, bondBefore);

                    if (bondEquipChanged && bondBefore) {
                        syncCoreAttrsOnEquipChange(bond, bondBefore, `ràng buộc ${name}`);
                    }

                    if (!bondBefore ||
                        bond.Cấp_độ !== bondBefore.Cấp_độ ||
                        safeParseInt(bond.Thuộc_tính?.Thể_chất, 10) !== safeParseInt(bondBefore.Thuộc_tính?.Thể_chất, 10) ||
                        bondEquipChanged) {
                        calculateBondMaxHP(bond, name, { initMissingCurrentHp: true });
                    }

                    if (!bondBefore ||
                        bond.Cấp_độ !== bondBefore.Cấp_độ ||
                        bondEquipChanged ||
                        bondAttrChanged) {
                        calculateEquipmentStatsForActor(bond, statData, `ràng buộc ${name}`);
                    }
                });
            }

            // trang bị/Chủng_tộc thay đổi -> tính lại AC
            if (!playerBefore ||
                equipChanged ||
                player.Chủng_tộc !== playerBefore.Chủng_tộc) {
                calculateAC(statData);
            }

            // trang bị thay đổi -> ghi lại giảm sát thương phần trăm theo đường cong phòng ngự (trần 75%)
            if (equipChanged) {
                calculateDamageReductions(player, playerBefore);
            }

            // Tỷ_lệ_bạo_kíchthay đổi/ngưỡng bất thường -> tính lại Thuộc_tính_chiến_đấu
            calculateCombatStats(player);

            // Độ_thành_thạotự động nâng cao và rollback bậc kỹ năng do AI sửa
            handleProficiency(statData, statDataBefore);

            const comboEnteredBattle = handleComboBattleEntry(statData, statDataBefore);
            console.log(`[Chuyển tổ hợp] vòng lặp chính comboEnteredBattle=${comboEnteredBattle}`);

            // đồng bộ ô theo Chế_độ_hệ_thống_kỹ_năng (classic khôi phục ô gán tay, combo chỉ dựng lại 6+3 ô chủ động khi tự động chuyển)
            syncSkillSlotsByMode(statData, statDataBefore, { syncComboSlots: comboEnteredBattle });

            // combochế độ trực tiếp lấy "hiệp này đã dùng kỹ năng nào" từ diff ô của cập nhật lần này
            const comboRoundUsedSkills = collectComboRoundUsage(statData, statDataBefore) || [];

            // Kỹ_năngHồi_chiêuquản lý
            handleSkillCooldowns(statData, statDataBefore);

            // combochế độ sau khi kết toán hồi chiêu sẽ đẩy trạng thái hiển thị, và chỉ dựng lại 6+3 ô hiện tại sau tự động chuyển
            const comboAutoSwitched = advanceComboSkillState(statData, statDataBefore, comboRoundUsedSkills);
            console.log(`[Chuyển tổ hợp] vòng lặp chính comboAutoSwitched=${comboAutoSwitched}`);
            syncSkillSlotsByMode(statData, statDataBefore, { syncComboSlots: comboAutoSwitched });

            // Chiến_đấuxóa Sinh_mệnh_tạm_thời về 0 khi kết thúc
            const Chiến_đấu = statData.Chiến_đấu || {};
            const Chiến_đấuBefore = statDataBefore?.Chiến_đấu || {};
            if (Chiến_đấuBefore.Đang_chiến_đấu === true && Chiến_đấu.Đang_chiến_đấu === false) {
                if (player.Sinh_mệnh_tạm_thời > 0) {
                    player.Sinh_mệnh_tạm_thời = 0;
                    console.log('[HP tạm thời] Chiến_đấukết thúc, Sinh_mệnh_tạm_thời đã về 0');
                }
            }
        } finally {
            isProcessing = false;
        }
    }

    function processLevelUp(player) {
        let currentLevel = safeParseInt(player.Cấp_độ, 1);
        let currentExp = safeParseFloat(player.Tổng_kinh_nghiệm_hiện_tại, 0);
        let requiredExp = safeParseFloat(player.Ngưỡng_lên_cấp, 0);

        if (requiredExp <= 0) {
            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            player.Ngưỡng_lên_cấp = requiredExp;
        }

        while (currentExp >= requiredExp && requiredExp > 0) {
            currentLevel++;
            player.Cấp_độ = currentLevel;

            if (!player.Thuộc_tính) player.Thuộc_tính = {};
            if (currentLevel % 10 === 0) {
                player.Thuộc_tính.Điểm_thuộc_tính = safeParseInt(player.Thuộc_tính.Điểm_thuộc_tính) + 1;
            }
            const spPerLevel = (player.Chủng_tộc === 'Sâm_tinh_chủng') ? 30 : 25;
            const oldSP = safeParseInt(player.SP);
            const oldRP = safeParseInt(player.RP);
            player.SP = safeParseInt(player.SP) + spPerLevel;
            if (player.Cây_kỹ_năng) {
                player.Cây_kỹ_năng.Tổng_SP = safeParseInt(player.Cây_kỹ_năng.Tổng_SP) + spPerLevel;
            }
            player.RP = safeParseInt(player.RP) + 1;

            console.log(`[hỗ trợ kinh nghiệm] lên cấp! Lv.${currentLevel} | SP: ${oldSP}→${player.SP}(+${spPerLevel}) | RP: ${oldRP}→${player.RP}(+1)`);

            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            player.Ngưỡng_lên_cấp = requiredExp;
        }

        upgradeHiWeaponQuality(player);
    }

    function processBondLevelUp(bond, bondName) {
        if (!bond) return;

        let currentLevel = safeParseInt(bond.Cấp_độ, 1);
        const levelBaseExp = getLevelBaseTotalExp(currentLevel);
        const parsedExp = parseFloat(bond.Tổng_kinh_nghiệm_hiện_tại);
        if (bond.Tổng_kinh_nghiệm_hiện_tại === undefined || bond.Tổng_kinh_nghiệm_hiện_tại === null || isNaN(parsedExp)) {
            bond.Tổng_kinh_nghiệm_hiện_tại = levelBaseExp;
        } else if (parsedExp < levelBaseExp) {
            bond.Tổng_kinh_nghiệm_hiện_tại = levelBaseExp;
        }

        let currentExp = safeParseFloat(bond.Tổng_kinh_nghiệm_hiện_tại, levelBaseExp);
        let requiredExp = safeParseFloat(bond.Ngưỡng_lên_cấp, 0);

        if (requiredExp <= 0) {
            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            bond.Ngưỡng_lên_cấp = requiredExp;
        }

        let levelUps = 0;
        while (currentExp >= requiredExp && requiredExp > 0) {
            currentLevel++;
            levelUps++;
            bond.Cấp_độ = currentLevel;
            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            bond.Ngưỡng_lên_cấp = requiredExp;
        }

        if (levelUps > 0) {
            console.log(`[ràng buộc lên cấp] ${bondName} lên cấp ${levelUps} lần, hiện Lv.${currentLevel},ngưỡng kế tiếp=${requiredExp}`);
        }

        const needRecalcBondHp = levelUps > 0 ||
            bond.Giới_hạn_sinh_mệnh === undefined || bond.Giới_hạn_sinh_mệnh === null ||
            safeParseInt(bond.Giới_hạn_sinh_mệnh, 0) <= 0 ||
            bond.Sinh_mệnh_hiện_tại === undefined || bond.Sinh_mệnh_hiện_tại === null;
        if (needRecalcBondHp) {
            calculateBondMaxHP(bond, bondName, { initMissingCurrentHp: true });
        }
    }

    function shareExpToEligibleBonds(statData, gainedExp, player) {
        if (!statData || gainedExp <= 0) return;

        const bonds = statData.Danh_sách_ràng_buộc;
        if (!bonds || typeof bonds !== 'object') return;

        const playerLevel = safeParseInt(player?.Cấp_độ, 1);
        const playerName = player?.Tên || '';
        const nonNearbyShareLevelCap = 60;
        const nonNearbyShareExpCap = calculateDiabloThreshold(nonNearbyShareLevelCap + 1) - 1;

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (name === playerName) return;
            if (!isBondShareExpEnabled(bond)) return;

            const bondLevel = safeParseInt(bond.Cấp_độ, 1);
            if (bondLevel >= playerLevel) return;
            if (bond.Ở_gần !== true && bondLevel > nonNearbyShareLevelCap) return;

            const oldExp = safeParseFloat(bond.Tổng_kinh_nghiệm_hiện_tại, 0);
            const uncappedExp = oldExp + gainedExp;
            const newExp = bond.Ở_gần === true
                ? uncappedExp
                : Math.min(uncappedExp, nonNearbyShareExpCap);
            if (newExp <= oldExp) return;
            const actualGainedExp = newExp - oldExp;
            bond.Tổng_kinh_nghiệm_hiện_tại = newExp;

            console.log(`[phân phát kinh nghiệm] ${name} nhận kinh nghiệm +${actualGainedExp} (${oldExp} → ${newExp})`);
            processBondLevelUp(bond, name);
        });
    }

    function upgradeHiWeaponQuality(player) {
        if (!player.Danh_sách_trang_bị) return;
        const weapon = Object.values(player.Danh_sách_trang_bị).find(w => w && ((w.Tên || '').trim() === 'Hiiro'));
        if (!weapon) return;

        const lv = safeParseInt(player.Cấp_độ, 1);
        const oldWeaponLevel = safeParseInt(weapon.Cấp_độ, 1);
        if (oldWeaponLevel !== lv) {
            weapon.Cấp_độ = lv;
            console.log(`[Hiiro - đồng bộ Cấp_độ] ${oldWeaponLevel} → ${lv}`);
        }

        // gradient tăng trưởng phẩm chất của Hiiro:
        // Lv1-4 Thường,Lv5+ Tinh_lương,Lv10+ Hiếm,Lv20+ Thần_khí,Lv30+ Truyền_thuyết,Lv45+ Sử_thi,Lv70+ Thần_thoại
        let qualityIndex = 0;
        if (lv >= 70) qualityIndex = 6;
        else if (lv >= 45) qualityIndex = 5;
        else if (lv >= 30) qualityIndex = 4;
        else if (lv >= 20) qualityIndex = 3;
        else if (lv >= 10) qualityIndex = 2;
        else if (lv >= 5) qualityIndex = 1;

        const qualityTiers = ['Thường','Tinh_lương','Hiếm','Thần_khí','Truyền_thuyết','Sử_thi','Thần_thoại'];
        const newQuality = qualityTiers[qualityIndex];

        const hiEffects = [
            '[Cộng hưởng thần khí] Hiiro có ý thức tự thân, không thể bị người khác nhặt, đánh cắp hoặc cưỡng chế tháo trang bị. Khi Hiiro bị đánh rơi, tự động trở về tay Yato (hành động phụ).',
            '[Biến hình lưu thể] Thân đao hóa thành lưu thể cao áp tự do co duỗi, tấn công thường bỏ qua cộng thêm AC do vật che chắn và khiên cung cấp. Khoảng cách tấn công +5 thước.',
            '[Vết thương không lành] Vết thương do Hiiro gây ra không thể lành bằng thủ đoạn trị liệu thông thường (thuốc, trị liệu cấp thấp), phải thông qua kiểm định y tế DC15 hoặc trị liệu cấp cao mới có thể cầm máu. Khi trúng đòn, kèm trạng thái [Rách thương] (sát thương chảy máu mỗi hiệp = cấp của Yato).',
            '[Triệu hồi diện yêu] 1 lần/ngày (hành động phụ): triệu hồi 2 sói mặt nạ hỗ trợ chiến đấu, kéo dài 5 hiệp. Đòn đánh của sói mặt nạ kèm hiệu ứng [Nguyền rủa] (mọi thuộc tính mục tiêu -1, có thể cộng dồn). Sói mặt nạ phát nổ khi chết, gây sát thương bóng tối phạm vi nhỏ.',
            '[Lưỡi nước thần] Mọi đòn tấn công của Hiiro kèm sát thương thuộc tính nước (sát thương thêm = cấp × 0.5). Khi ở địa hình [Đọng nước] hoặc [Ẩm ướt], sát thương thêm nhân đôi. Hiiro có thể chủ động tạo địa hình [Đọng nước] phạm vi 5 thước (hành động phụ, 1 lần/nghỉ ngắn).',
            '[Hiiro - Giải phóng chân danh] 1 lần/ngày (hành động): Hiiro hóa thành hình thái lưu thể hoàn toàn, kéo dài 3 hiệp. Trong thời gian này tấn công biến thành phạm vi hình nón 15 thước, xúc xắc sát thương nhân đôi, và mỗi lần trúng khiến mục tiêu [Ẩm ướt]. Sau khi giải phóng kết thúc, Yato nhận 1 tầng [Mệt mỏi].',
            '[Chung yên đỏ thẫm] Đòn tấn công của Hiiro kèm hiệu ứng [Xâm thực]: mỗi lần trúng vĩnh viễn giảm 1 AC của mục tiêu (một mục tiêu tối đa 5 tầng). Mục tiêu bị Hiiro hạ không thể hồi sinh bằng bất kỳ thủ đoạn nào.'
        ];

        const hiAttrByQuality = [
            { Nhanh_nhẹn: 0 },
            { Nhanh_nhẹn: 1 },
            { Nhanh_nhẹn: 1, Sức_mạnh: 1 },
            { Nhanh_nhẹn: 2, Sức_mạnh: 1 },
            { Nhanh_nhẹn: 3, Sức_mạnh: 1 },
            { Nhanh_nhẹn: 4, Sức_mạnh: 2 },
            { Nhanh_nhẹn: 5, Sức_mạnh: 3 }
        ];

        if (weapon.Phẩm_chất !== newQuality) {
            const oldQuality = weapon.Phẩm_chất;
            weapon.Phẩm_chất = newQuality;
            weapon.Hạng_phẩm = 10;
            weapon.Hiệu_quả = hiEffects.slice(0, qualityIndex + 1).join(';');
            weapon.Cộng_thêm_thuộc_tính = hiAttrByQuality[qualityIndex];
            console.log(`[Hiiro - tăng trưởng] ${oldQuality} → ${newQuality} (Lv.${lv})`);
        }
    }

    // ==========================================
    // Độ_thành_thạotự động nâng cao và rollback AI
    // ==========================================

    const PROF_TIERS = ['Học_việc', 'Thành_thạo', 'Chuyên_gia', 'Đại_sư', 'Huyền_thoại'];
    const PROF_THRESHOLDS = { 'Học_việc': 25, 'Thành_thạo': 50, 'Chuyên_gia': 100, 'Đại_sư': 200, 'Huyền_thoại': Infinity };
    const PROF_TIER_BONUS = { 'Học_việc': 0, 'Thành_thạo': 1, 'Chuyên_gia': 2, 'Đại_sư': 4, 'Huyền_thoại': 6 };

    function getProfEffect(key, tier) {
        const bonus = PROF_TIER_BONUS[tier] ?? 0;
        return `${key} kiểm định liên quan +${bonus}`;
    }

    function getNextProfTier(current) {
        const idx = PROF_TIERS.indexOf(current);
        if (idx < 0 || idx >= PROF_TIERS.length - 1) return null;
        return PROF_TIERS[idx + 1];
    }

    function processProficiencyBlock(block, blockBefore, label) {
        if (!block || typeof block !== 'object') return;
        Object.entries(block).forEach(([key, entry]) => {
            if (!entry || typeof entry !== 'object') return;
            const oldEntry = blockBefore?.[key];

            // entry mới đăng ký (trước đó không tồn tại): tự điền Hiệu_quả, cưỡng chế hiệu chỉnh Ngưỡng_thăng_bậc
            if (!oldEntry) {
                const tier = entry.Bậc_kỹ_năng || 'Học_việc';
                const correctThreshold = PROF_THRESHOLDS[tier] === Infinity ? 0 : (PROF_THRESHOLDS[tier] || 100);
                if (safeParseInt(entry.Ngưỡng_thăng_bậc, 0) !== correctThreshold) {
                    console.warn(`[Độ_thành_thạobảo vệ] ⚠️ ${label}/${key} Ngưỡng_thăng_bậc lúc đăng ký bị lỗi(${entry.Ngưỡng_thăng_bậc}),đã sửa thành${correctThreshold}`);
                    entry.Ngưỡng_thăng_bậc = correctThreshold;
                }
                entry.Hiệu_quả = getProfEffect(key, tier);
                console.log(`[Độ_thành_thạođăng ký] ${label}/${key}: Bậc_kỹ_năng=${tier}, ngưỡng=${correctThreshold}, Hiệu_quả="${entry.Hiệu_quả}"`);
            }

            // rollback việc AI tự ý sửa Bậc_kỹ_năng: chỉ script mới được sửa Bậc_kỹ_năng
            if (oldEntry && oldEntry.Bậc_kỹ_năng && entry.Bậc_kỹ_năng !== oldEntry.Bậc_kỹ_năng) {
                console.warn(`[Độ_thành_thạobảo vệ] ⚠️ ${label}/${key} Bậc_kỹ_năngbị bên ngoài sửa ${oldEntry.Bậc_kỹ_năng}→${entry.Bậc_kỹ_năng},đã rollback`);
                entry.Bậc_kỹ_năng = oldEntry.Bậc_kỹ_năng;
                entry.Ngưỡng_thăng_bậc = oldEntry.Ngưỡng_thăng_bậc;
                entry.Hiệu_quả = oldEntry.Hiệu_quả || getProfEffect(key, oldEntry.Bậc_kỹ_năng);
            }

            // rollback việc AI tự ý sửa Hiệu_quả: chỉ script mới được sửa Hiệu_quả
            if (oldEntry && oldEntry.Hiệu_quả && entry.Hiệu_quả !== oldEntry.Hiệu_quả) {
                console.warn(`[Độ_thành_thạobảo vệ] ⚠️ ${label}/${key} Hiệu_quảbị bên ngoài sửa "${oldEntry.Hiệu_quả}"→"${entry.Hiệu_quả}",đã rollback`);
                entry.Hiệu_quả = oldEntry.Hiệu_quả;
            }

            // cưỡng chế hiệu chỉnh Ngưỡng_thăng_bậc (ngăn AI sửa bậy ngưỡng của entry đã có)
            const tier = entry.Bậc_kỹ_năng || 'Học_việc';
            const correctThreshold = PROF_THRESHOLDS[tier] === Infinity ? 0 : (PROF_THRESHOLDS[tier] || 100);
            if (safeParseInt(entry.Ngưỡng_thăng_bậc, 0) !== correctThreshold) {
                console.warn(`[Độ_thành_thạobảo vệ] ⚠️ ${label}/${key} Ngưỡng_thăng_bậclỗi(${entry.Ngưỡng_thăng_bậc}),đã sửa thành${correctThreshold}`);
                entry.Ngưỡng_thăng_bậc = correctThreshold;
            }

            const threshold = correctThreshold;
            const progress = safeParseInt(entry.Tiến_độ, 0);

            if (tier === 'Huyền_thoại') {
                // khóa ở cấp tối đa
                if (progress !== 0) entry.Tiến_độ = 0;
                return;
            }

            if (progress >= threshold) {
                const nextTier = getNextProfTier(tier);
                if (nextTier) {
                    entry.Bậc_kỹ_năng = nextTier;
                    entry.Tiến_độ = progress - threshold;
                    entry.Ngưỡng_thăng_bậc = PROF_THRESHOLDS[nextTier] === Infinity ? 0 : PROF_THRESHOLDS[nextTier];
                    entry.Hiệu_quả = getProfEffect(key, nextTier);
                    console.log(`[Độ_thành_thạoNâng_cao] ${label}/${key}: ${tier} → ${nextTier}, tiến độ dư=${entry.Tiến_độ}, Hiệu_quả="${entry.Hiệu_quả}"`);
                }
            }

            // bù đáy: nếu trường Hiệu_quả thiếu thì bổ sung
            if (!entry.Hiệu_quả) {
                entry.Hiệu_quả = getProfEffect(key, entry.Bậc_kỹ_năng || 'Học_việc');
            }
        });
    }

    function handleProficiency(statData, statDataBefore) {
        const prof = statData?.Nhân_vật?.Độ_thành_thạo;
        const profBefore = statDataBefore?.Nhân_vật?.Độ_thành_thạo;
        if (!prof) return;
        processProficiencyBlock(prof.Chiến_đấu, profBefore?.Chiến_đấu, 'Chiến_đấu');
        processProficiencyBlock(prof.Sinh_hoạt, profBefore?.Sinh_hoạt, 'Sinh_hoạt');
    }

    // ==========================================
    // đăng ký sự kiện
    // ==========================================

    const init = async () => {
        await waitGlobalInitialized('Mvu');
        eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, handleExperienceProcessing);
        try {
            const flagHost = window.parent || window;
            flagHost.__helper_calculator_loaded__ = true;
            flagHost.__helper_calculator_script_loaded__ = true;
        } catch(e) {
            window.__helper_calculator_loaded__ = true;
            window.__helper_calculator_script_loaded__ = true;
        }
        console.log('[Script tính toán phụ trợ] Script đã tải.');
        toastr.success('[Script tính toán phụ trợ] Script đã tải.');
    };

    $(init);

})();
