import React from "react";
import {
  FormControl,
  FormControlProps,
  ListSubheader,
  TextField,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import Autocomplete, {
  AutocompleteRenderGroupParams
} from "@material-ui/lab/Autocomplete";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
  Controller,
  UseControllerProps,
  UseFormGetValues,
  UseFormSetValue
} from "react-hook-form";
import { VariableSizeList, ListChildComponentProps } from "react-window";

type FormSelectorProps<T> = {
  label: string;
  required: boolean;
  handleChange?: (value: T[]) => void;
  options: string[];
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
};

type AutoCompleterProps<T> = FormControlProps &
  FormSelectorProps<T> &
  UseControllerProps;

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING
    }
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: React.ReactNode) => {
      if (React.isValidElement(child) && child.type === ListSubheader) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index: number) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  }
);

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0
    }
  }
});

const renderGroup = (params: AutocompleteRenderGroupParams) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children
];

function AutoCompleter<T>({
  name,
  label,
  control,
  required,
  options,
  defaultValue,
  setValue,
  getValues,
  ...rest
}: AutoCompleterProps<T>) {
  const classes = useStyles();

  return (
    <div>
      <FormControl {...rest}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="virtualize-demo"
              value={value}
              onChange={(e: React.ChangeEvent<{}>, value: unknown) => {
                onChange(value);
                setValue("Places", value);
              }}
              disableListWrap
              classes={classes}
              ListboxComponent={
                ListboxComponent as React.ComponentType<
                  React.HTMLAttributes<HTMLElement>
                >
              }
              renderGroup={renderGroup}
              options={options}
              groupBy={(option) => option[0].toUpperCase()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="10,000 options"
                />
              )}
              renderOption={(option) => (
                <Typography noWrap>{option}</Typography>
              )}
            />
          )}
        />
      </FormControl>
    </div>
  );
}

export default AutoCompleter;
