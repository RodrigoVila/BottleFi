import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type DashboardAction = {
  label: string;
  goToUrl: string;
  description: string;
};

export type ActiveAction = DashboardAction | null;

type DashboardContextType = {
  actions: DashboardAction[];
  activeAction: ActiveAction;
  setActiveAction: Dispatch<SetStateAction<ActiveAction>>;
};

type DashboardProviderProps = {
  children: ReactNode;
};

const actions: DashboardAction[] = [
  {
    label: "Add Token",
    goToUrl: "/add",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ullam omnis animi aspernatur veritatis incidunt delectus nulla provident? Natus delectus voluptates harum, aut deserunt libero nemo cumque sint fugiat praesentium?",
  },
  {
    label: "Transfer Token",
    goToUrl: "/transfer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ullam omnis animi aspernatur veritatis incidunt delectus nulla provident? Natus delectus voluptates harum, aut deserunt libero nemo cumque sint fugiat praesentium?",
  },
  {
    label: "Invalidate Token",
    goToUrl: "/invalidate",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ullam omnis animi aspernatur veritatis incidunt delectus nulla provident? Natus delectus voluptates harum, aut deserunt libero nemo cumque sint fugiat praesentium?",
  },
];

const initialValue: DashboardContextType = {
  actions,
  activeAction: null,
  setActiveAction: () => {},
};

const DashboardContext = createContext<DashboardContextType>(initialValue);

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [activeAction, setActiveAction] = useState<ActiveAction>(
    initialValue.activeAction
  );

  return (
    <DashboardContext.Provider
      value={{ actions, activeAction, setActiveAction }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
