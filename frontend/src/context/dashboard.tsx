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
  borderColor: string;
  hoverColor: string;
};

export type selectedAction = DashboardAction | null;

type DashboardContextType = {
  actions: DashboardAction[];
  selectedAction: selectedAction;
  setSelectedAction: Dispatch<SetStateAction<selectedAction>>;
  hoveredAction: selectedAction;
  setHoveredAction: Dispatch<SetStateAction<selectedAction>>;
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
    borderColor: "border-purple-700",
    hoverColor: "hover:border-purple-700",
  },
  {
    label: "Transfer Token",
    goToUrl: "/transfer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ullam omnis animi aspernatur veritatis incidunt delectus nulla provident? Natus delectus voluptates harum, aut deserunt libero nemo cumque sint fugiat praesentium?",
    borderColor: "border-fuchsia-700",
    hoverColor: "hover:border-fuchsia-700",
  },
  {
    label: "Invalidate Token",
    goToUrl: "/invalidate",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ullam omnis animi aspernatur veritatis incidunt delectus nulla provident? Natus delectus voluptates harum, aut deserunt libero nemo cumque sint fugiat praesentium?",
    borderColor: "border-red-700",
    hoverColor: "hover:border-red-700",
  },
];

const initialValue: DashboardContextType = {
  actions,
  selectedAction: null,
  setSelectedAction: () => {},
  hoveredAction: null,
  setHoveredAction: () => {},
};

const DashboardContext = createContext<DashboardContextType>(initialValue);

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [selectedAction, setSelectedAction] = useState<selectedAction>(
    initialValue.selectedAction
  );
  const [hoveredAction, setHoveredAction] = useState<selectedAction>(
    initialValue.selectedAction
  );

  const value = {
    actions,
    selectedAction,
    setSelectedAction,
    hoveredAction,
    setHoveredAction,
  };

  return (
    <DashboardContext.Provider value={value}>
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
