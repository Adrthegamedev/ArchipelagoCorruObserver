from BaseClasses import Region, Location, Item, ItemClassification, Tutorial
from worlds.AutoWorld import World, WebWorld
from .Items import CorruObserverItem, ItemData, item_table, moditems_obski, moditems_surfacerunning, moditems_quiz, moditems_maze, moditems_kotzu, moditems_humoroushumors, moditems_vielk, scansanity_item_table, modscansanity_items_obski, modscansanity_items_theirstreets, masteritem_table
from .Locations import CorruObserverLocation, location_table, getrules, modlocations_obski, modlocations_surfacerunning, modlocations_quiz, modlocations_maze, modlocations_kotzu, modlocations_humoroushumors, modlocations_vielk, scansanity_location_table, getscansanityrules, modscansanity_locations_obski, modscansanity_locations_theirstreets, masterlocation_table
from .Options import CorruObserverOptions, Mods
from worlds.generic.Rules import add_rule
import typing


class CorruObserverWeb(WebWorld):
    setup_en = Tutorial(
        "setup",
        "description here",
        "en",
        "setup_en.md",
        "setup/en",
        ["NovaeSys"]
    )
    tutorials = [setup_en]


class CorruObserverWorld(World):
    game = "CorruObserver"
    web = CorruObserverWeb()
    options_dataclass = CorruObserverOptions
    item_name_to_id = {name: data.code for name, data in masteritem_table.items()}
    location_name_to_id = {name: data.id for name, data in masterlocation_table.items()}

    def generate_early(self) -> None:
        enabled_mod_locations = []
        if self.options.scansanity:
            enabled_mod_locations.append(scansanity_location_table)
        if "obski" in self.options.mods:
            enabled_mod_locations.append(modlocations_obski)
            if self.options.scansanity:
                enabled_mod_locations.append(modscansanity_locations_obski)
        if "surfacerunning" in self.options.mods:
            enabled_mod_locations.append(modlocations_surfacerunning)
        if "quiz" in self.options.mods:
            enabled_mod_locations.append(modlocations_quiz)
        if "maze" in self.options.mods:
            enabled_mod_locations.append(modlocations_maze)
        #if "dialoguetelephone" in self.options.mods:
        #    enabled_mod_locations.append(modlocations_dialoguetelephone)
        if "kotzu" in self.options.mods:
            enabled_mod_locations.append(modlocations_kotzu)
        if "humoroushumors" in self.options.mods:
            enabled_mod_locations.append(modlocations_humoroushumors)
        if "vielk" in self.options.mods:
            enabled_mod_locations.append(modlocations_vielk)
        if "theirstreets" in self.options.mods:
            if self.options.scansanity:
                enabled_mod_locations.append(modscansanity_locations_theirstreets)

        for modlocation_table in enabled_mod_locations:
            for location in modlocation_table:
                location_table[location] = modlocation_table[location]

        enabled_mod_items = []
        if self.options.scansanity:
            enabled_mod_items.append(scansanity_item_table)
            item_table["The Embassy: Movefriend Fight Dialogue Begin"] = ItemData(54140050, ItemClassification.progression)
        if "obski" in self.options.mods:
            enabled_mod_items.append(moditems_obski)
            if self.options.scansanity:
                enabled_mod_items.append(modscansanity_items_obski)
        if "surfacerunning" in self.options.mods:
            enabled_mod_items.append(moditems_surfacerunning)
        if "quiz" in self.options.mods:
            enabled_mod_items.append(moditems_quiz)
        if "maze" in self.options.mods:
            enabled_mod_items.append(moditems_maze)
        #if "dialoguetelephone" in self.options.mods:
        #    enabled_mod_items.append(moditems_dialoguetelephone)
        #    item_table["Menu: Examined Dendritic Cyst"] = ItemData(54140000, ItemClassification.progression)
        if "kotzu" in self.options.mods:
            enabled_mod_items.append(moditems_kotzu)
        if "humoroushumors" in self.options.mods:
            enabled_mod_items.append(moditems_humoroushumors)
        if "vielk" in self.options.mods:
            enabled_mod_items.append(moditems_vielk)
        if "theirstreets" in self.options.mods:
            if self.options.scansanity:
                enabled_mod_items.append(modscansanity_items_theirstreets)
        for moditem_table in enabled_mod_items:
            for item in moditem_table:
                item_table[item] = moditem_table[item]

    def create_regions(self) -> None:
        menu_region = Region("Menu", self.player, self.multiworld)
        self.multiworld.regions.append(menu_region)

        hello_region = Region("Hello", self.player, self.multiworld)
        self.multiworld.regions.append(hello_region)

        hub_region = Region("Hub", self.player, self.multiworld)
        self.multiworld.regions.append(hub_region)

        city_region = Region("Their City", self.player, self.multiworld)
        self.multiworld.regions.append(city_region)

        streets_region = Region("City Streets", self.player, self.multiworld)
        self.multiworld.regions.append(streets_region)

        void_region = Region("The Void", self.player, self.multiworld)
        self.multiworld.regions.append(void_region)

        waters_region = Region("Their Waters", self.player, self.multiworld)
        self.multiworld.regions.append(waters_region)

        dullvessel_region = Region("Dull Vessel", self.player, self.multiworld)
        self.multiworld.regions.append(dullvessel_region)

        theirvessel_region = Region("Their Vessel", self.player, self.multiworld)
        self.multiworld.regions.append(theirvessel_region)

        firstchat_region = Region("First Chat", self.player, self.multiworld)
        self.multiworld.regions.append(firstchat_region)

        depths_region = Region("The Depths", self.player, self.multiworld)
        self.multiworld.regions.append(depths_region)

        uncosm_region = Region("Uncosm", self.player, self.multiworld)
        self.multiworld.regions.append(uncosm_region) 

        memoryhole_region = Region("Memory Hole", self.player, self.multiworld)
        self.multiworld.regions.append(memoryhole_region) 

        recosm_region = Region("Recosm", self.player, self.multiworld)
        self.multiworld.regions.append(recosm_region) 

        embassy_region = Region("The Embassy", self.player, self.multiworld)
        self.multiworld.regions.append(embassy_region) 

        clemens_region = Region("Clemens Romanus", self.player, self.multiworld)
        self.multiworld.regions.append(clemens_region) 

        cache_region = Region("Cache", self.player, self.multiworld)
        self.multiworld.regions.append(cache_region) 

        beneath_region = Region("Beneath", self.player, self.multiworld)
        self.multiworld.regions.append(beneath_region) 

        beneathdepths_region = Region("Beneath Depths", self.player, self.multiworld)
        self.multiworld.regions.append(beneathdepths_region) 

        parasite_region = Region("Parasite Plane", self.player, self.multiworld)
        self.multiworld.regions.append(parasite_region) 

        ozo_region = Region("Jokzi Ozo", self.player, self.multiworld)
        self.multiworld.regions.append(ozo_region) 

        golems_region = Region("Golem Maintenance", self.player, self.multiworld)
        self.multiworld.regions.append(golems_region) 

        frame_region = Region("::/FRAME/", self.player, self.multiworld)
        self.multiworld.regions.append(frame_region) 

        palehalls_region = Region("Pale Halls", self.player, self.multiworld)
        self.multiworld.regions.append(palehalls_region)


        menu_region.add_exits({"Hello": "Cyst entry"}, {"Hello": lambda state: state.has("Menu: Depth Scanned Cyst", self.player)})
        hello_region.add_exits({"Hub": "!!__GATE::FOR YOU__!!"}, {"Hub": lambda state: state.has("Hello: Sentry called you idiot", self.player)})
        hub_region.add_exits({"The Void": "!!__GATE::THE VOID__!!"}, {"The Void": lambda state: state.has("Visited: /local/orbit/", self.player)})
        hub_region.add_exits({"Their Waters": "!!__GATE::THEIR WATERS__!!"}, {"Their Waters": lambda state: state.has("Visited: /local/ocean/", self.player)})
        hub_region.add_exits({"The Embassy": "!!__GATE::THE EMBASSY__!!"}, {"The Embassy": lambda state: state.has("Visited: /local/ocean/embassy/", self.player)})
        hub_region.connect(city_region)
        city_region.connect(streets_region)
        streets_region.connect(city_region)
        city_region.connect(void_region)
        void_region.connect(dullvessel_region)
        void_region.connect(waters_region)
        void_region.connect(city_region)
        waters_region.connect(void_region)
        waters_region.connect(theirvessel_region)
        theirvessel_region.connect(waters_region)
        theirvessel_region.connect(firstchat_region)
        firstchat_region.connect(theirvessel_region)
        waters_region.add_exits({"The Depths": "!!__GATE::THE DEPTHS__!!"}, {"The Depths": lambda state: state.has("First Chat: Be Honest", self.player)})
        depths_region.add_exits({"Uncosm": "!!__GATE::GATE::GATE::__!!"}, {"Uncosm": lambda state: state.has("Progressive EP0 Epilogue", self.player)})
        waters_region.add_exits({"The Embassy": "!!__THE EMBASSY__!!"}, {"The Embassy": lambda state: state.has("Hub: Funfriend EP1 Fed dialogue", self.player)})
        theirvessel_region.add_exits({"Clemens Romanus": "!!__CLEMENS ROMANUS__!!"}, {"Clemens Romanus": lambda state: (state.has("Progressive EP0 Epilogue", self.player) and state.has("Menu: EP1 Shown Materials", self.player))})
        dullvessel_region.add_exits({"Parasite Plane": "!!__PARASITE PLANE__!! (Dull Vessel)"}, {"Parasite Plane": lambda state: ((state.has("Menu: EP1 Fed", self.player)) and state.has("Jokzi Ozo: Hunger Mask", self.player))})
        waters_region.add_exits({"Cache": "!!__MEMBRANE INCISION__!! (Their Waters)"}, {"Cache": lambda state: state.has("Menu: EP1 Fed", self.player)})
        void_region.add_exits({"Cache": "!!__MEMBRANE INCISION__!! (Void)"}, {"Cache": lambda state: state.has("Menu: EP1 Fed", self.player)})
        city_region.add_exits({"Cache": "!!__MEMBRANE INCISION__!! (City)"}, {"Cache": lambda state: state.has("Menu: EP1 Fed", self.player)})
        hub_region.add_exits({"Cache": "!!__MEMBRANE INCISION__!! (Hub)"}, {"Cache": lambda state: state.has("Hub: Funfriend Ozo Gate dialogue", self.player)})
        cache_region.connect(theirvessel_region)
        cache_region.add_exits({"Jokzi Ozo": "Ò½º"}, {"Jokzi Ozo": lambda state: state.has("Menu: EP2 Intro", self.player)})
        uncosm_region.add_exits({"Recosm": "!!__HOME__!!"}, {"Recosm": lambda state: state.has("Hub: Funfriend God Dialogue", self.player)})
        uncosm_region.connect(memoryhole_region)
        recosm_region.add_exits({"Cache": "!!__MEMBRANE_LESION__!!"}, {"Cache": lambda state: state.has("Recosm: God End State", self.player)})
        clemens_region.add_exits({"Beneath": "Clemens Beneath Warp"}, {"Beneath": lambda state: state.has("Menu: EP2 Intro", self.player)})
        clemens_region.add_exits({"First Chat": "Clemens First Chat Warp"}, {"First Chat": lambda state: state.has("Menu: EP2 Intro", self.player)})
        streets_region.add_exits({"Beneath": "City Beneath Warp"}, {"Beneath": lambda state: (state.has("Menu: EP2 Intro", self.player) and state.has("Jokzi Ozo: Hunger Mask", self.player))})
        dullvessel_region.add_exits({"Beneath": "Dull Vessel Beneath Warp"}, {"Beneath": lambda state: ((state.has("Menu: EP1 Fed", self.player)) and state.has("Jokzi Ozo: Hunger Mask", self.player))})
        ozo_region.add_exits({"Beneath": "Jokzi Ozo Beneath Warp"}, {"Beneath": lambda state: state.has("The Void: Fairy Unitied", self.player)})
        ozo_region.add_exits({"Parasite Plane": "!!__PARASITE PLANE__!! (Jokzi Ozo)"}, {"Parasite Plane": lambda state: (state.has("Jokzi Ozo: Hunger Mask", self.player) and state.has("City Streets: Isabel Unitied", self.player) and state.has("Parasite Plane: Gamer Effigy Unitied", self.player))})
        beneath_region.connect(ozo_region)
        beneath_region.connect(parasite_region)
        beneath_region.connect(streets_region)
        beneath_region.connect(dullvessel_region)
        beneath_region.connect(clemens_region)
        parasite_region.connect(dullvessel_region)
        parasite_region.add_exits({"Jokzi Ozo": "Parasite Plane Ozo warp"}, {"Jozki Ozo": lambda state: (state.has("Parasite Plane: Gamer Effigy Unitied", self.player) and state.has("City Streets: Isabel Unitied", self.player))})
        parasite_region.connect(beneath_region)
        firstchat_region.add_exits({"Beneath Depths": "Interview Beneath Depths warp"}, {"Beneath Depths": lambda state: (((state.can_reach_region("Clemens Romanus", self.player) and state.has("Menu: EP2 Intro", self.player)) or state.has("Jokzi Ozo: Hunger Mask", self.player)) and state.has("First Chat: Be Honest", self.player))})
        self.multiworld.register_indirect_condition(self.multiworld.get_region("Clemens Romanus", self.player), self.multiworld.get_entrance("Interview Beneath Depths warp", self.player))
        firstchat_region.add_exits({"Clemens Romanus": "Interview Clemens Romanus warp"}, {"Clemens Romanus": lambda state: (((state.can_reach_region("Clemens Romanus", self.player) and state.has("Menu: EP2 Intro", self.player)) or state.has("Jokzi Ozo: Hunger Mask", self.player)) and state.has("First Chat: Be Honest", self.player))})
        self.multiworld.register_indirect_condition(self.multiworld.get_region("Clemens Romanus", self.player), self.multiworld.get_entrance("Interview Clemens Romanus warp", self.player))
        embassy_region.add_exits({"Golem Maintenance": "Embassy Continue Iteration Warp"}, {"Golem Maintenance": lambda state: (state.has("Menu: EP2 Intro", self.player) and state.has("Hub: Framing Device Installation", self.player)) and state.has("Menu: EP3 Intro", self.player)})
        embassy_region.add_exits({"City Streets": "Suspicion Continue Memory Stream Warp"}, {"City Streets": lambda state: state.has("The Embassy: Completed Discovery", self.player)})
        golems_region.add_exits({"::/FRAME/": "Door Gap"}, {"::/FRAME/": lambda state: state.has("Jokzi Ozo: Hunger Mask", self.player)})
        frame_region.add_exits({"Jokzi Ozo": "Escape"}, {"Jokzi Ozo": lambda state: state.has("::/FRAME/: Won Escape", self.player)})
        ozo_region.add_exits({"::/FRAME/": "!!__WHEEL__!! (Replay)"}, {"::/FRAME/": lambda state: state.has("::/FRAME/: Won Escape", self.player)})
        ozo_region.add_exits({"The Depths": "!!__gate::L‹ïAöIÁå__!!"}, {"The Depths": lambda state: (state.can_reach_region("Beneath", self.player) or state.can_reach_entrance("Escape", self.player) or state.can_reach_entrance("Parasite Plane Ozo warp", self.player))})
        self.multiworld.register_indirect_condition(self.multiworld.get_region("Beneath", self.player), self.multiworld.get_entrance("!!__gate::L‹ïAöIÁå__!!", self.player))
        self.multiworld.register_indirect_condition(self.multiworld.get_region("Parasite Plane", self.player), self.multiworld.get_entrance("!!__gate::L‹ïAöIÁå__!!", self.player))
        self.multiworld.register_indirect_condition(self.multiworld.get_region("::/FRAME/", self.player), self.multiworld.get_entrance("!!__gate::L‹ïAöIÁå__!!", self.player))
        golems_region.add_exits({"Pale Halls": "Golem Maintenance Continue Iteration Warp"}, {"Pale Halls": lambda state: state.has("Menu: EP4 Intro", self.player)})
        


        location_name_to_var = {
            "Menu": menu_region,
            "Hello": hello_region,
            "Hub": hub_region,
            "Their City": city_region,
            "City Streets": streets_region,
            "The Void": void_region,
            "Their Waters": waters_region,
            "Dull Vessel": dullvessel_region,
            "Their Vessel": theirvessel_region,
            "First Chat": firstchat_region,
            "The Depths": depths_region,
            "Uncosm": uncosm_region,
            "Memory Hole": memoryhole_region,
            "Recosm": recosm_region,
            "The Embassy": embassy_region,
            "Clemens Romanus": clemens_region,
            "Cache": cache_region,
            "Beneath": beneath_region,
            "Beneath Depths": beneathdepths_region,
            "Parasite Plane": parasite_region,
            "Jokzi Ozo": ozo_region,
            "Golem Maintenance": golems_region,
            "::/FRAME/": frame_region,
            "Pale Halls": palehalls_region,
        }

        if "obski" in self.options.mods:
            obski_region = Region("O-BSK-I", self.player, self.multiworld)
            self.multiworld.regions.append(obski_region)
            location_name_to_var["O-BSK-I"] = obski_region
            parasite_region.connect(obski_region)
            obski_region.connect(parasite_region)

        for location in location_table:
            location_data = location_table[location]
            locationobj = CorruObserverLocation(self.player, location, location_data.id, location_name_to_var[location_data.region])
            location_name_to_var[location_data.region].locations.append(locationobj)

        for location, rule in getrules(self).items():
            add_rule(self.multiworld.get_location(location, self.player), rule)

        if self.options.scansanity:
            for location, rule in getscansanityrules(self).items():
                add_rule(self.multiworld.get_location(location, self.player), rule)
        
        #self.multiworld.completion_condition[self.player] = lambda state: (state.has("The Void: Fairy Unitied", self.player) and state.has("City Streets: Isabel Unitied", self.player) and state.has("City Streets: Fawners Effigies Unitied", self.player) and state.has("Beneath: Dancer Effigy Unitied", self.player) and state.has("Parasite Plane: Gamer Effigy Unitied", self.player) and state.has("Memory Hole: Effigy: Sipper Effigy Unitied", self.player) and state.has("Progressive Memory Hole Cavik", self.player, 2) and state.has("First Chat (Incoherent): Interview Lady Unitied", self.player) and state.has("::/FRAME/: Won Escape", self.player) and state.has("Golem Maintenance: Dog Unity", self.player))
        victory_loc = CorruObserverLocation(self.player, "Defeat Vekoa", None, palehalls_region)
        victory_loc.place_locked_item(CorruObserverItem("Victory", ItemClassification.progression, None, self.player))
        self.multiworld.completion_condition[self.player] = lambda state: state.has("Victory", self.player)
        location_name_to_var["Pale Halls"].locations.append(victory_loc)
        
        if "maze" in self.options.mods:
            add_rule(self.multiworld.get_location("First Chat (Incoherent, Funnier Maze): Caged Demon", self.player), lambda state: (((state.can_reach_region("Clemens Romanus", self.player) and state.has("Menu: EP2 Intro", self.player)) or state.has("Jokzi Ozo: Hunger Mask", self.player)) and state.has("First Chat: Be Honest", self.player)))
            add_rule(self.multiworld.get_location("First Chat (Incoherent, Funnier Maze): Demon Unitied", self.player), lambda state: (((((state.can_reach_region("Clemens Romanus", self.player) and state.has("Menu: EP2 Intro", self.player)) or state.has("Jokzi Ozo: Hunger Mask", self.player)) and state.has("First Chat: Be Honest", self.player))) and state.has("Jokzi Ozo: Unity Mask", self.player)))
            add_rule(self.multiworld.get_location("First Chat (Incoherent, Funnier Maze): Reached End", self.player), lambda state: (((state.can_reach_region("Clemens Romanus", self.player) and state.has("Menu: EP2 Intro", self.player)) or state.has("Jokzi Ozo: Hunger Mask", self.player)) and state.has("First Chat: Be Honest", self.player)))
            #self.multiworld.completion_condition[self.player] = lambda state: (state.has("The Void: Fairy Unitied", self.player) and state.has("City Streets: Isabel Unitied", self.player) and state.has("City Streets: Fawners Effigies Unitied", self.player) and state.has("Beneath: Dancer Effigy Unitied", self.player) and state.has("Parasite Plane: Gamer Effigy Unitied", self.player) and state.has("Memory Hole: Effigy: Sipper Effigy Unitied", self.player) and state.has("Progressive Memory Hole Cavik", self.player, 2) and state.has("First Chat (Incoherent): Interview Lady Unitied", self.player) and state.has("::/FRAME/: Won Escape", self.player) and state.has("Golem Maintenance: Dog Unity", self.player) and state.has("First Chat (Incoherent, Funnier Maze): Demon Unitied", self.player))
        #if "dialoguetelephone" in self.options.mods:
        #    add_rule(self.multiworld.get_location("connection_attempted", self.player), lambda state: state.has("Menu: Examined Dendritic Cyst", self.player))
        if "kotzu" in self.options.mods:
            add_rule(self.multiworld.get_location("Memory Hole: Kotzu, Azzun Dialogue", self.player), lambda state: state.has("Memory Hole: Kotzu, Intro Complete", self.player))
            add_rule(self.multiworld.get_location("Memory Hole: Kotzu, Zuteki Dialogue", self.player), lambda state: state.has("Memory Hole: Kotzu, Intro Complete", self.player))

        
        

    def create_items(self) -> None:
        for item in item_table:
            item_data = item_table[item]
            for i in range(item_data.count):
                itemobj = self.create_item(item)
                self.multiworld.itempool.append(itemobj)
        self.multiworld.local_early_items[self.player]["Menu: Depth Scanned Cyst"] = 1
        self.multiworld.local_early_items[self.player]["Menu: Completed Intro"] = 1

    def create_item(self, name: str) -> "Item":
        item_data = item_table[name]
        item = CorruObserverItem(name, item_data.classification, item_data.code, self.player)
        return item
    
    def create_event(self, name: str) -> "Item":
        item = CorruObserverItem(name, ItemClassification.progression, None, self.player)
        return item

    def fill_slot_data(self) -> dict[str, any]:
        # In order for our game client to handle the generated seed correctly we need to know what the user selected
        # for their difficulty and final boss HP.
        # A dictionary returned from this method gets set as the slot_data and will be sent to the client after connecting.
        # The options dataclass has a method to return a `Dict[str, Any]` of each option name provided and the relevant
        # option's value.
        return self.options.as_dict("scansanity", "mods")
