import IPimg from "../../util/IPimg";
import { useItemObserver, useNumberItemObserver } from "../setItems/useSetItemsObserver";
import MachineDisplay from "./MachineDisplay";
import GeodeDisplay from "./GeodeDisplay";
import { MACHINES } from "./machines";
import OverviewBox from "../OverviewBox";
import LabeledIPimg from "../../util/LabeledIPimg";
import { useState, MouseEvent } from "react";

const GEODES = ["grey", "blue", "green", "red", "cyan", "ancient"];

const id = "MiningOverview";
const MiningOverview = () => {
  const [oilIn] = useNumberItemObserver("oil_in", id);
  const [oilOut, setOilOut] = useNumberItemObserver("oil_out", id);

  const [miningXp] = useNumberItemObserver("mining_xp", id);
  const miningLevel = get_level(miningXp);

  const changeOilOut = (change: number) => setOilOut(oilOut + change);

  const [rocket] = useNumberItemObserver("rocket", id);
  const [rocketStatus] = useItemObserver("rocket_status", id);
  const [rocketKm] = useNumberItemObserver("rocket_km", id);
  const [rocketDistanceRequired] = useNumberItemObserver("rocket_distance_required", id);
  const [rocketFuel] = useNumberItemObserver("rocket_fuel", id);

  const onRocketClick = (event: MouseEvent) => {
    Modals.clicks_rocket();
  };

  const [moonstone] = useNumberItemObserver("moonstone", id);

  const onMoonstoneClick = (event: MouseEvent) => {
    Modals.open_custom_crafting('moonstone')
  };

  return (
    <OverviewBox height={"auto"} width={400}>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <LabeledIPimg
          name={"oil"}
          label={`${oilIn > oilOut ? "+" : ""}${oilIn - oilOut}`}
          size={30}
          style={{
            justifyContent: "center",
            color: oilIn >= oilOut ? "#fff" : "#ff0000",
            filter: oilIn >= oilOut ? "" : "invert(16%) sepia(91%) saturate(5761%) hue-rotate(357deg) brightness(96%) contrast(116%)",
          }}
        />

        {rocket > 0 &&
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <IPimg
                name={rocketKm > 0 && rocketKm < rocketDistanceRequired ? "rocket" : "rocket_idle"}
                ext={rocketKm > 0 && rocketKm < rocketDistanceRequired ? "gif" : "png"}
                size={30}
                onClick={onRocketClick}
                className={rocketKm > 0 && rocketKm < rocketDistanceRequired ? "shake" : ""}
                title={Items.get_pretty_item_name("rocket")}
                role={"button"}
              />
              <span>{Items.get_pretty_item_name(rocketStatus)}</span>
            </div>

            <LabeledIPimg
              name={"rocket_fuel"}
              label={rocketFuel}
              size={30}
              style={{ justifyContent: "center" }}
            />
          </>
        }
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {Object.keys(MACHINES).map((machine) => (
          <MachineDisplay
            machine={machine}
            changeOilOut={changeOilOut}
            {...MACHINES[machine]}
            miningLevel={miningLevel}
            key={machine}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {GEODES.map((geode) => (
          <GeodeDisplay geode={geode} key={geode} />
        ))}

        {moonstone > 0 &&
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "50px",
              alignItems: "center",
            }}
          >
            <IPimg
              name={"moonstone"}
              size={30}
              onClick={onMoonstoneClick}
              title={Items.get_pretty_item_name("Moonstone")}
              role={"button"}
            />
            <span>{moonstone}</span>
          </div>
        }
      </div>
    </OverviewBox>
  );
};

export default MiningOverview;
