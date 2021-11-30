class Pluralize {

    constructor() {
        this._uncountables = [
            "access", "accommodation", "adulthood", "advertising", "advice",
            "aggression", "aid", "air", "alcohol", "anger", "applause",
            "arithmetic", "art", "assistance", "athletics", "attention",
            "bacon", "baggage", "ballet", "beauty", "beef", "beer", "biology",
            "botany", "bread", "butter", "carbon", "cash", "chaos", "cheese",
            "chess", "childhood", "clothing", "coal", "coffee", "commerce",
            "compassion", "comprehension", "content", "corruption", "cotton",
            "courage", "currency", "dancing", "danger", "data", "delight",
            "dignity", "dirt", "distribution", "dust", "economics", "education",
            "electricity", "employment", "engineering", "envy", "equipment",
            "ethics", "evidence", "evolution", "faith", "fame", "fish", "flour", "flu",
            "food", "freedom", "fuel", "fun", "furniture", "garbage", "garlic",
            "genetics", "gold", "golf", "gossip", "grammar", "gratitude", "grief",
            "ground", "guilt", "gymnastics", "hair", "happiness", "hardware",
            "harm", "hate", "hatred", "health", "heat", "height", "help", "homework",
            "honesty", "honey", "hospitality", "housework", "humour", "hunger",
            "hydrogen", "ice", "ice", "cream", "importance", "inflation", "information",
            "injustice", "innocence", "iron", "irony", "jealousy", "jelly", "judo",
            "karate", "kindness", "knowledge", "labour", "lack", "laughter", "lava",
            "leather", "leisure", "lightning", "linguistics", "litter", "livestock",
            "logic", "loneliness", "luck", "luggage", "machinery", "magic",
            "management", "mankind", "marble", "mathematics", "mayonnaise",
            "measles", "meat", "methane", "milk", "money", "mud", "music", "nature",
            "news", "nitrogen", "nonsense", "nurture", "nutrition", "obedience",
            "obesity", "oil", "oxygen", "passion", "pasta", "patience", "permission",
            "physics", "poetry", "pollution", "poverty", "power", "pronunciation",
            "psychology", "publicity", "quartz", "racism", "rain", "relaxation",
            "reliability", "research", "respect", "revenge", "rice", "rubbish",
            "rum", "salad", "satire", "seaside", "shame", "shopping", "silence",
            "sleep", "smoke", "smoking", "snow", "soap", "software", "soil",
            "sorrow", "soup", "speed", "spelling", "steam", "stuff", "stupidity",
            "sunshine", "symmetry", "tennis", "thirst", "thunder", "toast",
            "tolerance", "toys", "traffic", "transporation", "travel", "trust", "understanding",
            "unemployment", "unity", "validity", "veal", "vengeance", "violence",
            "sheep", "deer", "moose", "swine", "bison", "corps", "means", "series",
            "scissors", "species"];        

        this._rules = [
            ["(th)is$", "$1ese"],
            ["(th)at$", "$1ose"],
            ["(millen)ium$", "$1ia"],
            ["(l)eaf$", "$1eaves"],
            ["(r)oof$", "$1oofs"],
            ["(gen)us$", "$1era"],
            ["(embarg)o$", "$1oes"],
            ["arf$", "arves"],
            ["^(b|tabl)eau$", "$1eaux"],
            ["^(append|matr)ix$", "$1ices"],
            ["^(ind)ex$", "$1ices"],
            ["^(a)pparatus$", "$1pparatuses"],
            ["^(a)lumna$", "$1lumnae"],
            ["^(alg|vertebr|vit)a$", "$1ae"],
            ["^(d)ie$", "$1ice"],
            ["(m|l)ouse$", "$1ice"],
            ["^(p)erson$", "$1eople"],
            ["^(o)x$", "$1xen"],
            ["^(c)hild$", "$1hildren"],
            ["(g)oose$", "$1eese"],
            ["(t)ooth$", "$1eeth"],
            ["lf$", "lves"],
            ["(f)oot$", "$1eet"],
            ["^(wo|work|fire)man$", "$1men"],
            ["(potat|tomat|volcan)o$", "$1oes"],
            ["(criteri|phenomen)on$", "$1a"],
            ["(nebul)a", "$1ae"],
            ["oof$", "ooves"],
            ["ium$", "ia"],
            ["um$", "a"],
            ["oaf$", "oaves"],
            ["(thie)f$", "$1ves"],
            ["fe$", "ves"],
            ["(buffal|carg|mosquit|torped|zer|vet|her|ech)o$", "$1oes"],
            ["o$", "os"],
            ["ch$", "ches"],
            ["sis$", "ses"],
            ["(corp)us$", "$1ora"],
            ["(cact|nucle|alumn|bacill|fung|radi|stimul|syllab)us$", "$1i"],
            ["(ax)is", "$1es"],
            ["(sh|zz|ss)$", "$1es"],
            ["x$", "xes"],
            ["(t|sp|r|l|b)y$", "$1ies"],
            ["s$", "ses"],
            ["$", "s"]
        ];
    }

    pluralOf(word, count = 2) {

        if (count == 1 || word.length == 0 || this.#sortedArrayContains(this._uncountables, word))
            return word;

        for (var i = 0; i < this._rules.length; i++) {
            
            let [rule,template] = this._rules[i];
            let re = RegExp(rule);
            let newValue = word.replace(re, template);

            if (newValue !== word)
                return newValue;
        }

        return word;
    }

    #sortedArrayContains(array, item) {

        let first = 0;
        let last = array.length-1;

        while (first <= last) {
            let mid = Math.floor((first + last) / 2);

            if (array[mid] == item)
                return true;

            if (item < array[mid]) {
                last = mid - 1;
            } else {
                first = mid + 1;
            }
        }

        return false;
    }

}

export let Pluralizer = new Pluralize();
